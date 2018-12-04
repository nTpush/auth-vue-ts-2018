// api 接口
import root from './root'
export default {
  /**
   * 菜单维护
   */
  MENU: {
    menu:               root.httpUrl + root.httpHost + '/system/menu'
  },

   /**
    * 配置信息
    */
  CONFIG: {
    menu:              root.httpUrl + root.httpHost + '/user/config'
  },

  IUSER: {
    user:              root.httpUrl + root.httpHost + '/system/user'
  },

  ZZZ: {
    userList: root.httpUrl + root.httpHost + '/node/user-list'
  },
  BOOK: {
    user: root.httpUrl + root.httpHost + '/book/user',
    flow: root.httpUrl + root.httpHost + '/book/flow',
    flowNode: root.httpUrl + root.httpHost + '/book/flow-node'
  },
   /**
    * 用户
    */
  USER: {
    login:              root.httpUrl + root.httpHost + '/user/login',
    logout:             root.httpUrl + root.httpHost + '/user/logout',
    check:              root.httpUrl + root.httpHost + '/user/check-login',
    todo:               root.httpUrl + root.httpHost + '/user/doto-list',
    role:               root.httpUrl + root.httpHost + '/user/set-role',
    ro:                 root.httpUrl + root.httpHost + '/user/choose-role',
    le:                 root.httpUrl + root.httpHost + '/user/user-role',
    edit:               root.httpUrl + root.httpHost + '/user/edit-role',
    page:               root.httpUrl + root.httpHost + '/user/check-page'
  },

  ROLE: {
    default:              root.httpUrl + root.httpHost + '/system/default-menu',
    role:                 root.httpUrl + root.httpHost + '/system/role'
  },
   /**
    * dist
    */
  DIST: {
    list:                root.httpUrl + root.httpHost + '/dist/list',
    back:                root.httpUrl + root.httpHost + '/dist/back',
  },

  LOG:  {
    user:                    root.httpUrl + root.httpHost + '/log/user',
    operation:               root.httpUrl + root.httpHost + '/log/operation'
  },

  RE: {
    menu:                      root.httpUrl + root.httpHost + '/re/menu',
    node:                      root.httpUrl + root.httpHost + '/re/node',
    default:                   root.httpUrl + root.httpHost + '/re/menu-default'
  },

  DATABASES: {
    tables:                    root.httpUrl + root.httpHost + '/user/tables'
  }

}
/**
 * dist 文件上传
 */
export const uploadDist = root.httpUrl + root.httpHost + '/upload/dist'
