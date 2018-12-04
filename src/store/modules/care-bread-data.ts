import Vue from 'vue'
import { Commit } from 'vuex'
import * as types from '../mutation-types'

import store from '@/store/index.ts'
import router from '@/router/index.js'

// TODO 公共数据获取 如 菜单信息

let state = {
    /**
     * 从session中获取面包屑
     */
  stateBreads: sessionStorage.getItem('bread') ? JSON.parse(sessionStorage.getItem('bread')) : [{
    id: 1,
    'resource_name': '主页',
    'resource_url' : '/index'
  }],
  stateNowIndex: sessionStorage.getItem('now_index') ? sessionStorage.getItem('now_index') : 1,
  stateOpenId: sessionStorage.getItem('open_index') ? sessionStorage.getItem('open_index') : 0
}

const mutations = {
    /**
     * 添加面包屑
     * @param state
     * @param info
     */
  [types.SETBREADS] (state, info) {
        /**
         * 去重存储
         * @type {Array}
         */
    let arr = []
    state.stateBreads.forEach((item) => {
      arr.push(item.id)
    })
    if (arr.indexOf(info.id) === -1 && (info.id !== -1)) state.stateBreads.push(info)
    state.stateNowIndex = info.id
    store.getters.storeMenuList.forEach((item, key) => {
      if (item.id === Number(state.stateNowIndex)) {
        state.stateOpenId = key
        return
      } else {
        item.children.forEach((i) => {
          if (Number(state.stateNowIndex) === i.id) {
            state.stateOpenId = key
            return
          }
        })
      }
    })
        /**
         * 存储到 本地 sessionStorage
         */
    sessionStorage.setItem('open_index', state.stateOpenId)
    sessionStorage.setItem('now_index', state.stateNowIndex)
    sessionStorage.setItem('bread', JSON.stringify(state.stateBreads))
  },
    /**
     * 删除面包屑
     * @param state
     * @param info
     */
  [types.DELBREADS] (state, info) {
        // console.log(state.breads[state.breads.indexOf(info) - 1], state.breads.indexOf(info) , 'dd')

        /**
         * 如果传进来的id 等于nowIndex, 当前的index则等于他的前一个
         */
    if (Number(info.id) === Number(state.stateNowIndex)) {
      if (store.getters.stateBreads.length <= 2 || (state.stateBreads.indexOf(info) === store.getters.stateBreads.length - 1)) {
        state.stateNowIndex = state.stateBreads[state.stateBreads.indexOf(info) - 1].id
      } else {
        state.stateNowIndex = state.stateBreads[state.stateBreads.indexOf(info) + 1].id
      }
    }
        /**
         * 路由跳转
         */
    state.stateBreads.forEach((item) => {
      if (Number(item.id) === Number(state.stateNowIndex)) {
        store.getters.storeMenuList.forEach((item, key) => {
          if (item.id === Number(state.stateNowIndex)) {
            state.stateOpenId = key
            return
          } else {
            item.children.forEach((i) => {
              if (Number(state.stateNowIndex) === i.id) {
                state.stateOpenId = key
                return
              }
            })
          }
        })
        router.push(item.resource_url)
        return
      }
    })
    state.stateBreads.splice(state.stateBreads.indexOf(info), 1)
    sessionStorage.setItem('open_index', state.stateOpenId)
    sessionStorage.setItem('now_index', state.stateNowIndex)
    sessionStorage.setItem('bread', JSON.stringify(state.stateBreads))
  },
  [types.SETOPENID] (state, info) {
    console.log(info, 'info')
    state.stateOpenId = info
    sessionStorage.setItem('open_index', state.stateOpenId)
        // state.stateNowIndex = info
        // sessionStorage.setItem("now_index", state.stateNowIndex)
  }
}

const actions = {
  ActionSetBread: ({ commit }, bread) => {
    commit(types.SETBREADS, bread)
  },
  ActionDelBread: ({ commit }, bread) => {
    commit(types.DELBREADS, bread)
  },
  ActionSetOpenId: ({ commit }, open) => {
    commit(types.SETOPENID, open)
  }
}

const getters = {
  stateBreads: stateBreads => state.stateBreads,
  stateOpenId: stateOpenId => [ '-' + state.stateOpenId ],
  stateNowIndex: stateNowIndex => state.stateNowIndex
}
export default {
  state,
  mutations,
  actions,
  getters
}
