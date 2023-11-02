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
    }
]