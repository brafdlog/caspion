/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { VNode } from 'vue';
import { Store } from 'vuex';

declare module 'vuex' {
  export interface Store<S> {
    restored: Promise<S>;
  }
}
