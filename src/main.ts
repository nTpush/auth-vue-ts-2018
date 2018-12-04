// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
'use strict'
import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import VueThreejs from 'vue-threejs'
import iview, { Message, Notice } from 'iview'
import VueI18n from 'vue-i18n'
import ZkTable from 'vue-table-with-tree-grid'
import VueDND from 'awe-dnd'
import store from './store'
import { Button, Cell, InfiniteScroll, Lazyload, Indicator, Picker } from 'mint-ui'

import { BLACKLIST } from './_config/blackList'

import { M } from '@/_config/M.ts'
import ApiReq from '@/service/index'

import 'mint-ui/lib/style.css'
import '../static/css/reset.css'/*引入公共样式*/
import 'iview/dist/styles/iview.css'
import '../static/css/iview.css'





window['io'] = require('socket.io-client');

// Vue.prototype.$socket = window['io']('http://localhost:7777');

Vue.prototype.$socket = window['io']('http://47.98.171.72:6001');


Vue.use(VueDND)
Vue.component(Picker.name, Picker)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)

Vue.prototype.$loading = Indicator
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.prototype.M = M
Vue.prototype.$http = ApiReq
Vue.prototype.$isMessage = true

Vue.config.productionTip = false

Vue.use(InfiniteScroll, Lazyload)
Vue.use(VueThreejs)
Vue.use(iview)
Vue.use(VueI18n)
Vue.use(ZkTable)
// 路由白名单
router.beforeEach((to, from, next) => {
      // console.log((whiteRouter.indexOf(from.path) === -1),'white')
      // console.log(to.fulimport md5 from 'js-md5';lPath.split('#')[1], '#')
      //   console.log(to.fullPath, '所需要验证的路由')
  let currentPathArr = to.fullPath.split('/')
  let currentPath = '/' + currentPathArr[currentPathArr.length - 1]
  let obj = {
    path: currentPath
  }
  if (!(BLACKLIST.indexOf(to.fullPath) === -1)) {
    new ApiReq('USER', obj).post('page').then(res => {
      if (res) {
        store.dispatch('ActionCheckLogin').then(() => {
          if (store.getters.storeUserInfo.name) {
            next()
          } else {
            next({
              path: '/'
            })
          }
        })
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
  next()
        // if(!(BLACKLIST.indexOf(to.fullPath) === -1) ) {
        //     store.dispatch('ActionCheckLogin').then(()=>{
        //         //TODO 权限验证
        //          if(store.getters.storeUserInfo.name) {
        //             next()
        //          }else {
        //             Vue.prototype.$Message.error(Vue.prototype.M.a)
        //             next({
        //                 path: '/'
        //             })
        //         }
        //     })
        // }else {
        //     console.log('此路由不需要验证')
        //     next()
        // }
})

const messages = {
  zh: {
    message: {
      hellos: [
        {
          component: 'dashboard',
          title: '中文',
          indexNum: 0
        },
        {
          component: 'dashboard',
          title: '中文1',
          indexNum: 1
        }
      ]
    }
  },
  en: {
    message: {
      hellos: [
        {
          component: 'dashboard',
          title: 'English',
          indexNum: 0
        },
        {
          component: 'dashboard',
          title: 'English1',
          indexNum: 1
        }
      ]
    }
  }
}

const i18n = new VueI18n({
  locale: 'en', // 语言标识
  messages
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
