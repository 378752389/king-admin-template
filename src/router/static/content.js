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
            path: 'package',
            name: 'package',
            meta: {
                title: '套餐管理'
            },
            component: () => import('@/views/content/package/index.vue')
        },
        {
            path: 'package-add',
            name: 'package-add',
            meta: {
                title: '添加套餐',
                hidden: true,
            },
            component: () => import('@/views/content/package/add.vue')
        },
        {
            path: 'package-update',
            name: 'package-update',
            meta: {
                title: '修改套餐',
                hidden: true,
            },
            component: () => import('@/views/content/package/update.vue')
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
