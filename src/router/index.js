import {createRouter, createWebHistory} from 'vue-router'


export const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'king-food-admin',
            icon: 'king-home-filled',
            hidden: true
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home1',
                meta: {
                    title: '主页',
                    icon: 'king-home-filled',
                },
                component: () => import('@/views/common/profiler.vue')
            },
            {
                path: '401',
                name: '401',
                meta: {
                    title: '401',
                    icon: '',
                    hidden: true
                },
                component: () => import('@/views/common/401.vue')
            },
            {
                path: '404',
                name: '404',
                meta: {
                    title: '404',
                    icon: '',
                    hidden: true
                },
                component: () => import('@/views/common/404.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: '测试菜单11111111'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'page1',
                name: 'page1',
                meta: {
                    hidden: true,
                    title: '测试页1'
                },
                component: () => import('@/views/Test.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                meta: {
                    title: '测试页2',
                    permission: 'test:page2'
                },
                component: () => import('@/views/Test.vue')
            },
            {
                path: 'page3',
                name: 'pag3',
                meta: {
                    title: '测试页2'
                },
                component: () => import('@/views/Test.vue')
            }
        ]
    },
    {
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
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
