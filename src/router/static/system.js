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
            path: 'admin',
            name: 'admin',
            meta: {
                title: '用户管理',
                permission: 'system:admin'
            },
            component: () => import('@/views/system/admin/index.vue')
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
            path: 'alloc-permission',
            name: 'alloc-permission',
            meta: {
                title: '权限分配管理',
                hidden: true,
                permission: 'system:role'
            },
            component: () => import('@/views/system/role/components/AllocPermission.vue')
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
            path: 'file',
            name: 'file',
            meta: {
                title: '文件管理',
                permission: 'system:file'
            },
            component: () => import('@/views/system/file/index.vue')
        },
        {
            path: 'message',
            name: 'message',
            meta: {
                title: '消息补偿管理',
                // permission: 'system:message'
            },
            component: () => import('@/views/system/message/index.vue')
        },
        {
            path: 'admin-add',
            name: 'admin-add',
            meta: {
                title: '添加用户',
                hidden: true,
                permission: 'system:admin:add'
            },
            component: () => import('@/views/system/admin/add.vue')
        },
        {
            path: 'admin-update',
            name: 'admin-update',
            meta: {
                title: '修改用户',
                hidden: true,
                permission: 'system:admin:update'
            },
            component: () => import('@/views/system/admin/update.vue')
        }
    ]
}