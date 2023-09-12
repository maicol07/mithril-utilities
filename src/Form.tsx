import m, {
  ChildArray,
  Children,
  Vnode,
  VnodeDOM
} from 'mithril';
import Stream from 'mithril/stream';

import Component from './Component';
import Mithril from 'mithril';

export type FormSubmitEvent = SubmitEvent & {data: FormData};
export interface FormAttributes extends Partial<Omit<HTMLElementTagNameMap['form'], 'style' | 'onsubmit'>> {
  onsubmit?: (event: FormSubmitEvent) => void,
  state?: Record<string, Stream<string | any>> | Map<string, Stream<string | any>>
  additionalElementsSelector?: string
}

export type FormInputAttributes = HTMLElementTagNameMap['input'] & {
  'data-state'?: Stream<string | any>,
}

/**
 * A form component that automatically attaches streams to elements.
 * @template A The attributes of the form.
 */
export default class Form<A extends FormAttributes = FormAttributes> extends Component<A, A['state']> {
  /** @inheritDoc */
  element!: HTMLFormElement;
  /**
   * The `onsubmit` function passed to the form.
   */
  onsubmitFunction?: A['onsubmit'];
  /**
   * The state of the form.
   */
  state!: NonNullable<A['state']>;

  formElements!: HTMLFormElement[];

  oninit(vnode: Vnode<A, this>) {
    super.oninit(vnode);
    this.onsubmitFunction = vnode.attrs.onsubmit;
    this.state = vnode.attrs.state ?? new Map();
    delete vnode.attrs.state;
  }

  view(vnode: Vnode<A>) {
    const attrs = this.attrs.except(['onsubmit', 'state', 'additionalElementsSelector']);
    return (
      <form {...attrs.all()} onsubmit={this.onsubmit.bind(this)} oninput={this.oninput.bind(this)}>
        {vnode.children}
      </form>
    );
  }

  oninput(event: Event) {
    const element = event.target as HTMLInputElement & FormInputAttributes;
    const stream = element.dataset.state ?? this.getState(element.getAttribute('name') ?? element.id);
    if (stream) {
      const preferredValueProp = element.dataset.preferredValueProp ?? 'value';
      // @ts-expect-error (preferredValueProp is recognized as a generic string)
      stream(element[preferredValueProp]);
    }
  }

  oncreate(vnode: VnodeDOM<A, this>) {
    super.oncreate(vnode);

    this.formElements = [...this.element.elements] as HTMLFormElement[];
    if (vnode.attrs.additionalElementsSelector) {
      this.formElements.push(...this.element.querySelectorAll<HTMLFormElement>(vnode.attrs.additionalElementsSelector));
    }

    this.setStreamValueToInputs(this.formElements);

    // Fix for submit elements not attached to the form
    if (!this.formElements.some((element) => element.getAttribute('type') === 'submit')) {
      const submitter = this.element.querySelector<HTMLElement>('[type="submit"]');
      if (submitter) {
        submitter.addEventListener('click', () => {
          try {
            this.element.requestSubmit(submitter);
          } catch (e) {
            this.element.requestSubmit();
          }
        });
      }
    }
  }

  onupdate(vnode: Mithril.VnodeDOM<A, this>) {
    super.onupdate(vnode);
    this.setStreamValueToInputs(this.formElements)
  }

  setStreamValueToInputs(inputs: HTMLInputElement[] | HTMLFormElement[]) {
    // Attach streams to inputs
    for (const element of inputs) {
      const stream = this.getState(element.getAttribute('name') ?? element.id);
      if (stream) {
        const preferredValueProp = element.dataset.preferredValueProp ?? 'value';
        // @ts-expect-error (preferredValueProp is recognized as a generic string)
        element[preferredValueProp] = stream() ?? '';
      }
    }
  }

  onsubmit(e: FormSubmitEvent) {
    e.preventDefault();
    e.data = new FormData(e.target as HTMLFormElement);
    this.onsubmitFunction?.(e);
  }

  private getState(key: string) {
    if (this.state instanceof Map) {
      return this.state.get(key);
    }
    return this.state[key];
  }
}
