export default [
    {
        url: `/api/order`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            orderNo: '@datetime("yyyyMMddHHmmssSSS")' + 1,
                            createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            account: '@word(6, 12)',
                            amount: '@float(10, 199, 2, 2)',
                            payWay: '@pick(["微信支付", "支付宝支付"])',
                            status: '@pick([1, 2, 3, 4])',
                        }
                    ],
                    'pageNum': parseInt(query.pageNum),
                    'pageSize': parseInt(query.pageSize),
                    'total': 100
                }
            }
        }
    },
    {
        url: '/api/order/:id',
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    id: query.id,
                    orderNo: '202006270100000001',
                    payType: 1,
                    payTime: '2023-11-09 10:06:30',
                    status: 1,
                    remark: '',
                    source: 1,
                    type: 1,

                    promotionAmount: 10,
                    totalAmount: 345.2,
                    payAmount: 300,

                    couponId: '',
                    couponName: '',
                    couponAmount: '10',

                    useIntegration: '100',
                    integrationAmount: '10',
                    integration: '345',

                    memberId: 1,
                    memberName: 'king',
                    phone: '18312344321',

                    packageList: [
                        {
                            packageName: '香辣鸡腿堡套餐',
                            packagePic: 'http://localhost:8999/product/656f0985ca2ab293d77feda503b0069b.png',
                            packagePrice: '19.9',
                            extra: '',
                            packageNum: 1,
                        },
                        {
                            packageName: '香辣鸡腿堡套餐',
                            packagePic: 'http://localhost:8999/product/656f0985ca2ab293d77feda503b0069b.png',
                            packagePrice: '19.9',
                            extra: '',
                            packageNum: 2,
                        },
                        {
                            packageName: '香辣鸡腿堡套餐',
                            packagePic: 'http://localhost:8999/product/656f0985ca2ab293d77feda503b0069b.png',
                            packagePrice: '19.9',
                            extra: '',
                            packageNum: 3,
                        },
                    ],

                    operateHistory: [{
                        operateBy: 'king',
                        createTime: '2023-10-07 11:11:11',
                        orderStatus: '已下单',
                        description: '客户说要延迟发货'
                    }]
                }
            }
        }
    }
]