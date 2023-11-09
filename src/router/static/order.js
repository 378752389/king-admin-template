export default {
    order: 2,
    path: '/order',
    name: 'order',
    meta: {
        title: '订单管理',
        permission: 'order'
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'list',
            name: 'list',
            meta: {
                title: '订单列表',
                permission: 'order:list'
            },
            component: () => import('@/views/order/list/index.vue')
        },
        {
            path: 'order-detail',
            name: 'order-detail',
            meta: {
                title: '订单详情',
                permission: 'order:list',
                hidden: true,
            },
            component: () => import('@/views/order/list/components/OrderDetail.vue')
        },
        {
            path: 'setting',
            name: 'setting',
            meta: {
                title: '订单设置',
                permission: 'order:setting'
            },
            component: () => import('@/views/order/setting/index.vue')
        },
        {
            path: 'return-apply',
            name: 'return-apply',
            meta: {
                title: '退货申请管理',
                permission: 'order:returnApply'
            },
            component: () => import('@/views/order/returnApply/index.vue')
        },
        {
            path: 'return-apply-detail',
            name: 'return-apply-detail',
            meta: {
                title: '退货申请详情',
                hidden: true
                // permission: 'order:returnApply'
            },
            component: () => import('@/views/order/returnApply/ReturnApplyDetail.vue')
        },
        {
            path: 'returnReason',
            name: 'returnReason',
            meta: {
                title: '退货原因管理',
                permission: 'order:returnReason'
            },
            component: () => import('@/views/order/returnReason/index.vue')
        },
    ]
}