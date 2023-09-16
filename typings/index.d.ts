// noinspection JSUnusedGlobalSymbols

import './_common';

declare global {
  namespace JSX {
    type IntrinsicElementMap = {
      [tag in keyof HTMLElementTagNameMap]: Omit<Partial<HTMLElementTagNameMap[tag]>, 'style' | 'children'>;
    };
  }
}
