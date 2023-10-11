export default {
    order: 10,
    path: '/system',
    name: 'system',
    meta: {
        title: '系统管理',
        permission: 'system'
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'user',
            name: 'user',
            meta: {
                title: '用户管理',
                icon: '',
                permission: 'system:user'
            },
            component: () => import('@/views/system/user/index.vue')
        },
        {
            path: 'role',
            name: 'role',
            meta: {
                title: '角色管理',
                permission: 'system:role'
            },
            component: () => import('@/views/system/role/index.vue')
        },
        {
            path: 'resource',
            name: 'resource',
            meta: {
                title: '资源管理',
                permission: 'system:resource'
            },
            component: () => import('@/views/system/resource/index.vue')
        },
        {
            path: 'log',
            name: 'log',
            meta: {
                title: '日志管理',
                permission: 'system:log'
            },
            component: () => import('@/views/system/log/index.vue')
        },
        {
            path: 'config',
            name: 'config',
            meta: {
                title: '配置管理',
                permission: 'system:config'
            },
            component: () => import('@/views/system/config/index.vue')
        },
        {
            path: 'user-add',
            name: 'user-add',
            meta: {
                title: '添加用户',
                hidden: true
            },
            component: () => import('@/views/system/user/add.vue')
        },
        {
            path: 'user-update',
            name: 'user-update',
            meta: {
                title: '修改用户',
                hidden: true
            },
            component: () => import('@/views/system/user/update.vue')
        }
    ]
}