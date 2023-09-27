export default {
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
}