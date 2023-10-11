import {createRouter, createWebHistory} from 'vue-router'

const routeSegments = import.meta.glob('./static/*.js', {eager: true})

export const routes = [
    {
        order: -99,
        path: '',
        name: 'home',
        meta: {
            title: '主页',
            icon: 'king-home-filled',
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                meta: {
                    title: '仪表盘',
                },
                component: () => import('@/views/home/dashboard/index.vue')
            }
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
        path: '/common',
        name: 'common',
        meta: {
            title: '通用页',
            hidden: true
        },
        component: () => import('@/layout/index.vue'),
        children: [
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
                path: '403',
                name: '403',
                meta: {
                    title: '403',
                    icon: '',
                    hidden: true
                },
                component: () => import('@/views/common/403.vue')
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
    }
]
Object.keys(routeSegments).forEach(key => {
    routes.push(routeSegments[key].default)
})

// 排序路由
const sortRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (routes.children && route.children.length > 0) {
            sortRoute(routes[i].children);
        }
    }
    routes.sort((a, b) => a.order - b.order)
}

sortRoute(routes)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
