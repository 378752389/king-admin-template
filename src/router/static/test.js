export default {
    order: 0,
    path: '/test',
    name: 'test',
    meta: {
        title: '测试管理'
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'page1',
            name: 'page1',
            meta: {
                title: '接口测试管理'
            },
            component: () => import('@/views/test/page1.vue')
        }
    ]
}
