import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import breads from './modules/care-bread-data'

import role from './modules/role-management'

Vue.use(Vuex)

/**
 * 将 modules 的 store 合并
 * @type {Store}
 */
const store = new Vuex.Store({
  modules: {
    user,
    breads,
    role
  }
})
export default store
