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
            order: 1,
            meta: {
                title: '目录管理',
                // permission: 'content:category',
            },
            component: () => import('@/views/content/category/index.vue')
        },
        {
            path: 'product',
            name: 'product',
            order: 3,
            meta: {
                title: '商品管理',
                // permission: 'content:product',
            },
            component: () => import('@/views/content/product/index.vue')
        },
        {
            path: 'product-add',
            name: 'product-add',
            meta: {
                title: '添加商品',
                hidden: true,
                // permission: 'content:material',
            },
            component: () => import('@/views/content/product/add.vue')
        },
        {
            path: 'product-update',
            name: 'product-update',
            meta: {
                title: '修改商品',
                hidden: true,
                // permission: 'content:material',
            },
            component: () => import('@/views/content/product/update.vue')
        },
        {
            path: 'material',
            name: 'material',
            order: 4,
            meta: {
                title: '物料管理',
                // permission: 'content:material',
            },
            component: () => import('@/views/content/material/index.vue')
        },
        {
            path: 'package',
            name: 'package',
            order: 2,
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
    ]
}
