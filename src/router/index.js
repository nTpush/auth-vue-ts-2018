import Vue from 'vue'
import Router from 'vue-router'
// 测试
const HelloVue = r => require.ensure([], () => r(require('@/components/HelloVue')), 'demo')
const Demo = r => require.ensure([], () => r(require('@/components/Demo')), 'demo')
const Three = r => require.ensure([], () => r(require('@/components/Three')), 'demo')
const Export = r => require.ensure([], () => r(require('@/components/Export')), 'demo')
const Form = r => require.ensure([], () => r(require('@/views/form/form.vue')), 'demo')
const Creat = r => require.ensure([], () => r(require('@/views/form/creat/index.vue')), 'demo')
const Edit = r => require.ensure([], () => r(require('@/views/form/edit/index.vue')), 'demo')
const Import = r => require.ensure([], () => r(require('@/components/Import')), 'demo')
const Translation = r => require.ensure([], () => r(require('@/components/translation')), 'demo')
const TestTree = r => require.ensure([], () => r(require('@/components/Test.vue')), 'demo')
const Clock = r => require.ensure([], () => r(require('@/views/clock')), 'demo')


// 系统配置
const SystemConfiguration = r => require.ensure([], () => r(require('@/views/system-configuration/index.vue')), 'management')
const MenuManagement = r => require.ensure([], () => r(require('@/views/system-configuration/menu-management')), 'management')
const OperationLog = r => require.ensure([], () => r(require('@/views/system-configuration/operation-log')), 'management')
const UserManagement = r => require.ensure([], () => r(require('@/views/system-configuration/user-management')), 'management')
const RoleManagement = r => require.ensure([], () => r(require('@/views/system-configuration/role-management')), 'management')
const VersionUpdating = r => require.ensure([], () => r(require('@/views/system-configuration/version-updating')), 'management')
const ShowTables = r => require.ensure([], () => r(require('@/views/system-configuration/show-tables')), 'management')

// 一起转转
const ZzzConfiguration = r => require.ensure([], () => r(require('@/views/zzz/index.vue')), '17zzz')
const ZzzUserManagement = r => require.ensure([], () => r(require('@/views/zzz/user-management')), '17zzz')

// 图书管理
const BookConfiguration = r => require.ensure([], () => r(require('@/views/book/index.vue')), 'book')
const AddBook = r => require.ensure([], () => r(require('@/views/book/book-management')), 'book')
const BookApproval = r => require.ensure([], () => r(require('@/views/book/book-approval')), 'book')

const Main = r => require.ensure([], () => r(require('@/views/main')), 'main')
const Login = r => require.ensure([], () => r(require('@/views/login')), 'main')
const Error = r => require.ensure([], () => r(require('@/views/error')), 'main')
const Ifream = r => require.ensure([], () => r(require('@/views/ifream')), 'main')
const Menu1 = r => require.ensure([], () => r(require('@/views/menu')), 'main')
const Locked = r => require.ensure([], () => r(require('@/views/lock')), 'main')
const Person = r => require.ensure([], () => r(require('@/views/person')), 'main')



Vue.use(Router)

export default new Router({
  routes: [
      { path: '/', name: 'Main', component: Login  },
      { path: '/index', name: '首页', component: Main,
          redirect: '/index/ifream',
          children: [
               { path: 'menu1',   name: 'Munu1',  component: Menu1 },
               { path: 'haha',   name: 'Munu2',  component: Menu1 },
               { path: 'demo',   name: 'Munu3',  component: Menu1 },
               { path: 'ifream',   name: 'Ifream',  component: Ifream },
              // 系统配置
              {
                    path: 'system-configuration',  name: '系统管理',  component: SystemConfiguration,
                    redirect: '/index/system-configuration/menu-management',
                    children: [
                        { path: 'menu-management',   name: '菜单维护',  component: MenuManagement },
                        { path: 'log-management',   name: '日志管理',   component: OperationLog },
                        { path: 'user-management',   name: '用户管理',  component: UserManagement },
                        { path: 'role-management',   name: '角色管理',  component: RoleManagement },
                        { path: 'version-updating',   name: '更新版本', component: VersionUpdating },
                        { path: 'show-tables',   name: '数据库查看', component: ShowTables },

                    ]
              },
            // 一起转转转
            {
              path: '17zzz',  name: '一起转转转',  component: ZzzConfiguration,
              redirect: '/index/17zzz/user-management',
              children: [
                { path: 'user-management',   name: '一起转转转用户管理',  component: ZzzUserManagement },
              ]
            },

            // 图书管理
            {
              path: 'book',  name: '图书管理',  component: BookConfiguration,
              redirect: '/index/book/book-management',
              children: [
                { path: 'book-management',   name: '图书添加',  component: AddBook },
                { path: 'book-approval',  name:'图书审批',    component: BookApproval }
              ]
            },
              { path: 'demo/first',   name: '第1',  component: OperationLog },
              { path: 'demo/test',   name: '测试',  component: TestTree },
              { path: 'person',   name: '个人中心',  component: Person },
            ]},

      {
          path: '/hello',
          name: 'HelloVue',
          component: HelloVue
      },
      {
          path: '/demo',
          name: 'Demo',
          component: Demo
      },
      {
          path: '/three',
          name: 'Three',
          component: Three
      },
      {
          path: '/export',
          component: Export
      },
      {
          path: '/form',
          component: Form
      },
      {
          path: '/creat',
          component: Creat
      },
      {
          path: '/edit',
          component: Edit
      },
      {
          path: '/import',
          component: Import
      },
      {
          path: '/translation',
          component: Translation
      },
      {
          path: '/locked',
          component: Locked
      },
      {
          path: '/clock',
          component: Clock
      },
      {
          path: '*',
          component: Error
      }
  ]
})
// 记录上一个页面的scroll位置
// if (from.name) {
//     let contentElem = document.querySelector('.v-content')
//     let scrollTop = contentElem ? contentElem.scrollTop : '0'
//     store.state.common.scrollPos[from.name] = scrollTop
// }
