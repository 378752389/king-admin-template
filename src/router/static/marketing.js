export default {
    order: 3,
    path: '/marketing',
    name: 'marketing',
    meta: {
        title: '营销管理',
        permission: 'marketing',
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: 'coupon',
            name: 'coupon',
            meta: {
                title: '优惠券管理',
                permission: 'marketing:coupon',
            },
            component: () => import('@/views/marketing/coupon/index.vue')
        },
        {
            path: 'coupon-add',
            name: 'coupon-add',
            meta: {
                title: '添加优惠券',
                hidden: true
            },
            component: () => import('@/views/marketing/coupon/add.vue')
        },
        {
            path: 'coupon-update',
            name: 'coupon-update',
            meta: {
                title: '修改优惠券',
                hidden: true
            },
            component: () => import('@/views/marketing/coupon/update.vue')
        },
        {
            path: 'advertise',
            name: 'advertise',
            meta: {
                title: '广告管理',
                permission: 'marketing:advertise',
            },
            component: () => import('@/views/marketing/advertise/index.vue')
        },
        {
            path: 'advertise-add',
            name: 'advertise-add',
            meta: {
                title: '添加广告',
                hidden: true
            },
            component: () => import('@/views/marketing/advertise/add.vue')
        },
        {
            path: 'advertise-update',
            name: 'advertise-update',
            meta: {
                title: '修改广告',
                hidden: true
            },
            component: () => import('@/views/marketing/advertise/update.vue')
        },
    ]
}