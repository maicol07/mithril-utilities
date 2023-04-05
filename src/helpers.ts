import {Vnode, VnodeDOM} from 'mithril';

export function isVnode<A = any, S = undefined>(object_: any): object_ is Vnode<A, S> {
  return (object_ && !Array.isArray(object_) && object_.tag && object_.attrs) as boolean;
}

export function isVnodeDom<A = any, S = undefined>(object_: any): object_ is VnodeDOM<any, any> {
  return (isVnode<A, S>(object_) && 'dom' in object_ && object_.dom && object_.dom instanceof HTMLElement) as boolean;
}
