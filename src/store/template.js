// 由于在index.js中直接设置storeConfig并初始化store会导致jest测试store抛出异常，因此需要单独将storeConfig放在config.js中
// 但由于webstorm目前版本貌似只支持智能跳转到直接通过storeConfig初始化store的相关action及getter,因此额外添加了该模板文件，该文件仅用于webstorm 快速跳转对应state或getter，不参与具体代码逻辑
// 因此暂时不要将下面的一堆import module用config.js代替!!

import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import todo from './modules/todo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test,
    test2,
    todo
  },
})

export default store
