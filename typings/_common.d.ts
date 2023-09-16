import Mithril from 'mithril';
import CSS from 'csstype';

declare module 'mithril' {
  interface Attributes {
    style?: string | CSS.Properties
  }
}

declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      '__attrs': any,
    }

    interface IntrinsicAttributes extends Mithril._NoLifecycle<Mithril.Attributes> {
      children?: Mithril.Children | HTMLCollection
    }

    interface IntrinsicElements extends IntrinsicElementMap {
    }
  }
}
