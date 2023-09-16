import {KebabCasedProperties} from 'type-fest';
import './_common';

declare global {
  namespace JSX {
    type IntrinsicElementMap = {
      [tag in keyof HTMLElementTagNameMap]: KebabCasedProperties<Omit<Partial<HTMLElementTagNameMap[tag]>, 'style' | 'children'>>;
    };
  }
}
