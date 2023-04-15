import m, {
  ChildArray,
  Children,
  Vnode,
  VnodeDOM
} from 'mithril';
import Stream from 'mithril/stream';

import {isVnode} from './helpers';
import {Component} from './Component';

export type FormSubmitEvent = SubmitEvent & {data: FormData};
export interface FormAttributes extends Partial<Omit<HTMLElementTagNameMap['form'], 'style' | 'onsubmit'>> {
  onsubmit?: (event: FormSubmitEvent) => void,
  state?: Record<string, Stream<string | any>> | Map<string, Stream<string | any>>
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
      <form {...attrs.all()} onsubmit={this.onsubmit.bind(this)}>
        {(vnode.children as ChildArray).map(this.attachStreamToElement.bind(this))}
      </form>
    );
  }

  attachStreamToElement(child: Children) {
    // Check if child is a Vnode
    if (isVnode<{name?: string, id: string, value: unknown, oninput?:(event: Event) => void, state?: Stream<any>}>(child)) {
      const stream = child.attrs.state ?? this.getState(child.attrs.name ?? child.attrs.id);
      if (stream) {
        child.attrs.value = stream();

        const originalOninput = child.attrs.oninput;
        // This ESLint rule is disabled because it doesn't recognize that the `oninput` attribute is being set and Mithril uses it instead of adding an event listener
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        child.attrs.oninput = (event: Event) => {
          stream((event.target as HTMLInputElement).value);
          if (originalOninput) {
            originalOninput(event);
          }
        };

        delete child.attrs.state;
      }

      // Check if `child` has children and recursively call this function on them.
      if (Array.isArray(child.children)) {
        child.children = child.children.map(this.attachStreamToElement.bind(this));
      }
    }

    return child;
  }

  oncreate(vnode: VnodeDOM<A, this>) {
    super.oncreate(vnode);
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