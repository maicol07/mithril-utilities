// noinspection JSUnusedGlobalSymbols

import type * as CSS from 'csstype';
import type * as Mithril from 'mithril';

declare module 'mithril' {
  interface Attributes {
    oninit?: undefined,
    onbeforeremove?: undefined,
    onbeforeupdate?: undefined,
    oncreate?: undefined,
    onupdate?: undefined,
    onremove?: undefined,

    style?: string | CSS.Properties
  }
}

declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      '__attrs': any,
    }
    interface IntrinsicElements extends IntrinsicElementMap {}

    type IntrinsicElementMap = {
      [tag in keyof HTMLElementTagNameMap]: Omit<Partial<HTMLElementTagNameMap[tag]>, 'style'> & Mithril.Attributes;
    };
  }
}
