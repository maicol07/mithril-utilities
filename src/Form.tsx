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

  oninit(vnode: Vnode<A, this>) {
    super.oninit(vnode);
    this.onsubmitFunction = vnode.attrs.onsubmit;
    this.state = vnode.attrs.state ?? new Map();
    delete vnode.attrs.state;
  }

  view(vnode: Vnode<A>) {
    const attrs = this.attrs.except(['onsubmit', 'state'])
    return (
      <form {...attrs.all()} onsubmit={this.onsubmit.bind(this)} oninput={this.oninput.bind(this)}>
        {vnode.children}
      </form>
    );
  }

  oninput(event: InputEvent) {
    const input = event.target as HTMLInputElement & FormInputAttributes;
    const stream = this.getState(input.name ?? input.id);
    if (stream) {
      stream(input.value);
    }
  }

  oncreate(vnode: VnodeDOM<A, this>) {
    super.oncreate(vnode);
    const formElements = [...this.element.elements] as HTMLFormElement[];

    this.setStreamValueToInputs(formElements);

    if (![...this.element.elements].some((element) => element.getAttribute('type') === 'submit')) {
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
    this.setStreamValueToInputs([...this.element.elements] as HTMLFormElement[])
  }

  setStreamValueToInputs(inputs: HTMLInputElement[] | HTMLFormElement[]) {
    // Attach streams to inputs
    for (const element of inputs) {
      const stream = this.getState(element.name ?? element.id);
      if (stream) {
        element.value = stream();
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
