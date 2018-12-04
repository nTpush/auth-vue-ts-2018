import Vue from 'vue'
import { Commit } from 'vuex'
import * as types from '../mutation-types'
import ApiReq from '@/service/index'
import router from '@/router'

let state = {
   /**
    * 用户信息
    */
  storeUserInfo: {},

    /**
     * token信息
     */
  storeTokenInfo: window.localStorage.getItem('user_token') ? JSON.parse(window.localStorage.getItem('user_token')) : {},

    /**
     * 菜单
     */
  storeMenuList : [],

  storeMenu : [],
  storeNode : []
}

const mutations = {
  [types.SETUSERINFO] (state, info) {
    state.storeUserInfo = { ...info.user }
    state.storeMenu = info.roles['menu']
    state.storeNode = info.roles['node']
    if (info.token) {
      state.storeUserInfo = { ...info.user }
      state.storeTokenInfo = { ...info.token }
      state.storeMenu = info.roles['menu']
      state.storeNode = info.roles['node']
      window.localStorage.setItem('user_token', JSON.stringify(state.storeTokenInfo))
    }
  },
  [types.SETMENULIST] (state, data) {
    state.storeMenuList = data
  }
}
const actions = {
    /**
     * 登录
     */
  ActionLogin: ({ commit }, userInfo) => {
    return new Promise((resolve, reject) => {
      new ApiReq('USER', userInfo).post('login').then(res => {
        if (res) commit(types.SETUSERINFO, res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
    /**
     * 验证登录
     */
  ActionCheckLogin: ({ commit }) => {
    return new Promise((resolve, reject) => {
      new ApiReq('USER').get('check').then(res => {
        if (res) commit(types.SETUSERINFO, res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
    /**
     * 退出
     */
  ActionLoginOut: ({ commit }) => {
    return new Promise((resolve, reject) => {
      new ApiReq('USER').post('logout').then(res => {
        if (res) {
          commit(types.SETUSERINFO, {
            roles: {
              menu: [],
              node: []
            }
          })
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
    /**
     * 获取菜单数据
     */
  ActionMenuList: ({ commit }) => {
    return new Promise((resolve, reject) => {
      new Vue.prototype.$http('CONFIG').get('menu').then(res => {
        if (res) commit(types.SETMENULIST, res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {
  storeUserInfo: state => state.storeUserInfo,
  storeMenuList: state => state.storeMenuList,
  storeTokenInfo: state => state.storeTokenInfo,
  storeMenu: state => state.storeMenu,
  storeNode: state => state.storeNode
}
export default {
  state,
  mutations,
  actions,
  getters
}
