import Vue from 'vue'
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import config from './config'
import apis from './apis'
import store from '@/store'
import router from '@/router'
export default class ApiReq {
  model: string
  method: string
  data?: object
  query?: String
  request?: AxiosInstance
  constructor (model: string, data?: object, query?: string) {
    this.model = model
    this.data = data
    this.query = query
    this.request = axios.create(config)
      // 请求拦截
    this.request.interceptors.request.use(function (config) {
      Vue.prototype.$loading.open({
        spinnerType: 'fading-circle'
      })
      return config
    },function (err) {
      return Promise.reject(err)
    })
        // 设置响应拦截
    this.request.interceptors.response.use(function (response) {
      setTimeout(() => {
        Vue.prototype.$loading.close()
      },500)
      if (response.status === 200) {
        if (response.data.success) {
          return response.data.body
        } else {
          Vue.prototype.$Message.error(response.data.message)
          if (response.data.message === '无效的token') {
            router.push('/')
          }
        }
      } else {
        Vue.prototype.$Message.error('服务器错误,请联系管理员')
      }
    },function (error) {
      Vue.prototype.$loading.close()
      // 请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        Vue.prototype.$Message.error('请求超时，请重试！')
      } else {
        Vue.prototype.$Message.error('服务器错误,请联系管理员')
        return Promise.reject(error)
      }
    })
  }
  post (key: string): AxiosPromise {
    let token = store.getters.storeTokenInfo.access_token ? store.getters.storeTokenInfo.access_token : ''
    return this.request({
      url: apis[this.model][key],
      headers: { 'Authorization': 'Bearer ' + token ,'X-Requested-With': 'XMLHttpRequest' },
      method: 'post',
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: this.data
    })
  }
  get (key: string): AxiosPromise {
    let token = store.getters.storeTokenInfo.access_token ? store.getters.storeTokenInfo.access_token : ''
    let params = ''
    if (this.query) {
      params = `/${this.query}`
    }
    return this.request({
      url: apis[this.model][key] + params,
      headers: { 'Authorization': 'Bearer ' + token ,'X-Requested-With': 'XMLHttpRequest' },
      method: 'get'
    })
  }
  put (key: string): AxiosPromise {
    let token = store.getters.storeTokenInfo.access_token ? store.getters.storeTokenInfo.access_token : ''
    let params = ''
    if (this.query) {
      params = `/${this.query}`
    }
    return this.request({
      url: apis[this.model][key] + params,
      headers: { 'Authorization': 'Bearer ' + token ,'X-Requested-With': 'XMLHttpRequest' },
      method: 'put',
      transformRequest: [function (data) {
              // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: this.data
    })
  }
  delete (key: string): AxiosPromise {
    let token = store.getters.storeTokenInfo.access_token ? store.getters.storeTokenInfo.access_token : ''
    let params = ''
    if (this.query) {
      params = `/${this.query}`
    }
    return this.request({
      url: apis[this.model][key] + params,
      headers: { 'Authorization': 'Bearer ' + token ,'X-Requested-With': 'XMLHttpRequest' },
      method: 'delete'
    })
  }
}
