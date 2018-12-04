import Vue from 'vue'
import { Commit } from 'vuex'
import * as types from '../mutation-types'
import ApiReq from '@/service/index'
import store from '@/store/index'

let state = {
   /**
    * 规则信息
    */
  storeRoles: [],
  storeRolesList: [],
  storeRolesMenu: [],
  storeRolesNode: [],
  storeRolesCount: {},
  storeRolesCountNode: {}
}
const mutations = {
  [types.ADDROLES] (state, role) {
    if (Array.isArray(role)) {
      role.map(item => {
        state.storeRoles.splice(state.storeRoles.indexOf(item), 1)
      })
      state.storeRolesCountNode = {}
      let result = []
      state.storeRoles.map(item => {
        let pid = item.split('@')[1]
        result.push(pid)
      })
      for (let i = 0; i < result.length;) {
        let count = 0
        for (let j = i; j < result.length; j++) {
          if (result[i] === result[j]) {
            count++
          }
        }
        state.storeRolesCountNode[result[i]] = count
        i += count
      }

    } else {
      if (state.storeRoles.indexOf(role) === -1) {
        state.storeRoles.push(role)
      } else {
        state.storeRoles.splice(state.storeRoles.indexOf(role), 1)
      }
      state.storeRolesCountNode = {}
      let result = []
      state.storeRoles.map(item => {
        let pid = item.split('@')[1]
        result.push(pid)
      })
            // 统计数组各
      result.forEach(function (e) {
        state.storeRolesCountNode[e] = state.storeRolesCountNode[e] >= 1 ? state.storeRolesCountNode[e] + 1 : 1
      })
    }
  },
  [types.ADDROLESMENU] (state, role) {
    let id = Number(role.split('@')[0])
    let pid = role.split('@')[1]
    state.storeRolesCount = {}
    if (state.storeRolesMenu.indexOf(role) === -1) {
      state.storeRolesMenu.push(role)
    } else {
      console.log(id, pid, '子删除')
      console.log(store.getters['storeRoles'],'子相关')
      let arr = []
      store.getters['storeRoles'].forEach(item => {
        if (Number(id) === Number(item.split('@')[1])) {
          arr.push(item)
        }
      })
      console.log(arr, 'pp')
      store.dispatch('ActionAddRoles', arr)
      state.storeRolesMenu.splice(state.storeRolesMenu.indexOf(role), 1)
    }
    let result = []
        // console.log(state.storeRolesMenu,'menu')
    state.storeRolesMenu.map(item => {
      let pid = item.split('@')[1]
      result.push(Number(pid))
    })
    result.forEach(function (e) {
      state.storeRolesCount[e] = state.storeRolesCount[e] >= 1 ? state.storeRolesCount[e] + 1 : 1
    })
  },
  // [types.ADDROLESNODE] (state, role) { },
  [types.ADDROLESLIST] (state, menus) {
    state.storeRolesList = menus
  },
  [types.CLEARROLES] (state) {
    state.storeRoles = []
    state.storeRolesMenu = []
    state.storeRolesCount = {}
    state.storeRolesCountNode = {}
  }
}
const actions = {
  ActionAddRoles: ({ commit }, role) => {
    commit(types.ADDROLES, role)
  },
  ActionAddRolesList: ({ commit }, role) => {
    return new Promise((resolve, reject) => {
      new Vue.prototype.$http('USER').get('role').then(res => {
        if (res) {
          commit(types.ADDROLESLIST, res)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ActionAddRolesMenu: ({ commit }, role) => {
    commit(types.ADDROLESMENU, role)
  },
  ActionAddRolesNode: ({ commit }, role) => {
    commit(types.ADDROLESNODE, role)
  },
  ActionClearAllRoles: ({ commit }) => {
    commit(types.CLEARROLES)
  }
}
const getters = {
  storeRoles: storeRoles => state.storeRoles,
  storeRolesList: storeRolesList => state.storeRolesList,
  storeRolesMenu: storeRolesMenu => state.storeRolesMenu,
  storeRolesNode: storeRolesNode => state.storeRolesNode,
  storeRolesCount: storeRolesCount => state.storeRolesCount,
  storeRolesCountNode: storeRolesCountNode => state.storeRolesCountNode
}
export default {
  state,
  mutations,
  actions,
  getters
}
