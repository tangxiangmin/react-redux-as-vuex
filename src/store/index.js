import { initStore } from './core'

import test from './modules/test'
import todo from './modules/todo'
// import test2 from './modules/test2';

export const store = initStore({
  modules: {
    test,
    todo,
    // test2,
  },
})
