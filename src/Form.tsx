import m, {
  ChildArray,
  Children,
  Vnode,
  VnodeDOM
} from 'mithril';
import Stream from 'mithril/stream';

import {isVnode} from './helpers';
import Component from './Component';

export type FormSubmitEvent = SubmitEvent & {data: FormData};
export interface FormAttributes extends Partial<Omit<HTMLElementTagNameMap['form'], 'style' | 'onsubmit'>> {
  onsubmit?: (event: FormSubmitEvent) => void,
  state?: Record<string, Stream<string | any>> | Map<string, Stream<string | any>>
}

export type FormInputAttributes = HTMLElementTagNameMap['input'] & {
  state?: Stream<string | any>,
  'preferred-value-prop'?: 'value' | 'checked' | string,
  'preferred-event'?: 'oninput' | 'onchange' | string,
  [key: string]: any
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
    // Check if child is a Vnode
    if (isVnode<FormInputAttributes>(input)) {
      const stream = input.attrs.state ?? this.getState(input.attrs.name ?? input.attrs.id);
      if (stream) {
        const preferredValueProp = input.attrs['preferred-value-prop'] ?? 'value';
        const preferredEvent = input.attrs['preferred-event'] ?? 'oninput';
        /**
         * Handle updated state.
         */
        const newValue = stream();
        // Equality check is not strict since it wouldn't be safe.
        // Example: an int value can be set to an input with type="number"
        if (newValue != input.attrs.value) {
          input.attrs[preferredValueProp] = newValue;
        }

        const originalListener = input.attrs[preferredEvent];
        input.attrs[preferredEvent] = (event: Event) => {
          // @ts-expect-error — Event target has value property.
          stream(event.target![preferredValueProp]);
          if (originalListener) {
            originalListener(event);
          }
        };

        delete input.attrs.state;
      }
    }
  }

  oncreate(vnode: VnodeDOM<A, this>) {
    super.oncreate(vnode);

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
