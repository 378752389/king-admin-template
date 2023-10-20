export default {
    order: 1,
    path: '/content',
    name: 'content',
    meta: {
        title: '内容管理',
        // permission: 'content',
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'category',
            name: 'category',
            meta: {
                title: '目录管理',
                // permission: 'content:category',
            },
            component: () => import('@/views/content/category/index.vue')
        },
        {
            path: 'product',
            name: 'product',
            meta: {
                title: '食品管理',
                // permission: 'content:product',
            },
            component: () => import('@/views/content/product/index.vue')
        },
        {
            path: 'material',
            name: 'material',
            meta: {
                title: '物料管理',
                // permission: 'content:material',
            },
            component: () => import('@/views/content/material/index.vue')
        },
        {
            path: 'product-add',
            name: 'product-add',
            meta: {
                title: '添加产品',
                // hidden: true,
                // permission: 'content:material',
            },
            component: () => import('@/views/content/product/add.vue')
        },
        {
            path: 'product-update',
            name: 'product-update',
            meta: {
                title: '修改产品',
                hidden: true,
                // permission: 'content:material',
            },
            component: () => import('@/views/content/product/update.vue')
        },
    ]
}
