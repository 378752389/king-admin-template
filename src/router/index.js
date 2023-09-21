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
        path: '/content',
        name: 'content',
        meta: {
            title: '内容管理'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '目录管理'
                },
                component: () => import('@/views/content/category/index.vue')
            },
            {
                path: 'food',
                name: 'food',
                meta: {
                    title: '食品管理'
                },
                component: () => import('@/views/content/food/index.vue')
            },
            {
                path: 'material',
                name: 'material',
                meta: {
                    title: '物料管理'
                },
                component: () => import('@/views/content/material/index.vue')
            },
        ]
    },
    {
        path: '/order',
        name: 'order',
        meta: {
            title: '订单管理'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'list',
                name: 'list',
                meta: {
                    title: '订单列表'
                },
                component: () => import('@/views/order/list/index.vue')
            },
            {
                path: 'setting',
                name: 'setting',
                meta: {
                    title: '退货申请管理'
                },
                component: () => import('@/views/order/setting/index.vue')
            },
            {
                path: 'returnApply',
                name: 'returnApply',
                meta: {
                    title: '退货申请管理'
                },
                component: () => import('@/views/order/returnApply/index.vue')
            },
            {
                path: 'returnReason',
                name: 'returnReason',
                meta: {
                    title: '退货原因管理'
                },
                component: () => import('@/views/order/returnReason/index.vue')
            },
        ]
    },
    {
        path: '/marketing',
        name: 'marketing',
        meta: {
            title: '营销管理'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'coupon',
                name: 'coupon',
                meta: {
                    title: '优惠券管理'
                },
                component: () => import('@/views/marketing/coupon/index.vue')
            },
            {
                path: 'advertise',
                name: 'advertise',
                meta: {
                    title: '广告管理'
                },
                component: () => import('@/views/marketing/advertise/index.vue')
            },
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
