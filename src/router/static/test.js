export default {
    order: 0,
    path: '/test',
    name: 'test',
    meta: {
        title: '测试管理',
        permission: ''
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'page1',
            name: 'page1',
            meta: {
                title: '接口测试管理',
                permission: ''
            },
            component: () => import('@/views/test/page1.vue')
        },
        {
            path: 'page2',
            name: 'page2',
            meta: {
                title: '表单测试页面',
                permission: ''
            },
            component: () => import('@/views/test/page2.vue')
        },
        {
            path: 'page3',
            name: 'page3',
            meta: {
                title: '传参测试',
                permission: ''
            },
            component: () => import('@/views/test/page3.vue')
        },
        {
            path: 'page4',
            name: 'page4',
            meta: {
                title: '数据展示',
                permission: ''
            },
            component: () => import('@/views/test/page4.vue')
        }
    ]
}
