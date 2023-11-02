export default [
    {
        url: `/api/coupon`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            'name': function () {
                                return '全场优惠券' + this.id
                            },
                            enableTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            effectiveTime: '@datetime("yyyy-MM-dd")',
                            expireTime: '@datetime("yyyy-MM-dd")',
                            'sort|+1': 0,
                            'publish': '@pick([0, 1])',
                            'description': '@cword(30)',
                            type: '@pick([0, 1])',
                            releaseNum: '@pick([100, 500, 1000, 2000])',
                            limitNum: '@pick([1, 2, 5])',
                            amount: '@pick([2, 3, 5, 10, 20])',
                            thresholdAmount: '@pick([30, 50, 100, 200])',
                            remark: '@csentence(20)'
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