export const MENUS = [
    {
        name: '新增申请',
        id: '1',
        path: 'menu1',
        type: 'ios-navigate',
        children: [
            {
                name: '二级1',
                id: '1',
                path: 'menu1',
                type: 'ios-navigate'
            },
            {
                name: '二级2',
                id: '2',
                path: 'menu3',
                type: 'ios-navigate'
            }
        ]
    },
    {
        name: '医生信息维护',
        id: '2',
        path: 'menu2',
        type: 'search',
        children: []
    },
    {
        name: '系统配置',
        id: '3',
        path: 'menu2',
        type: 'ios-gear',
        children: [
            {
                name: '菜单维护',
                id: '1',
                path: 'system-configuration/menu-management',
                type: 'ios-navigate'
            },
            {
                name: '用户管理',
                id: '1',
                path: 'user-management',                type: 'ios-navigate'
            },
            {
                name: '权限管理',
                id: '1',
                path: 'authority-management',
                type: 'ios-navigate'
            },
            {
                name: '操作日志',
                id: '1',
                path: 'operation-log',
                type: 'ios-navigate'
            },
        ]
    }
]
