export default {
    order: 1,
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
}
