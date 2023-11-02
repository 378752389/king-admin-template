export default [
    {
        url: `/api/returnApply`,
        method: 'get',
        response: ({query}) => {
            let i = 1;
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            orderNo: '@datetime("yyyyMMddHHmmssSSS")' + i,
                            applyTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            account: '@cword(5, 12)',
                            returnAmount: '@float(5, 5000, 2, 2)',
                            status: '@pick([1, 2, 3, 4])',
                            operateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            reason: '@pick(["地址填错", "不喜欢", "不合适", "售后服务差"])',
                            description: '@csentence(30)',
                            pics: function () {
                                return `https://picsum.photos/id/${i++}/600/600`
                            },
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
        url: `/api/returnApply/:id`,
        method: 'get',
        response: ({query}) => {
            // 获取id值
            console.log(query.id)
            return {
                code: 200,
                message: '请求成功',
                data: {
                    'returnPackage|2-5': [
                        {
                            'id|+1': 1,
                            pic: '@image("200x200", "#50B347", "#FFF", "king")',
                            name: '@cword(5, 10)',
                            amount: '@float(1, 199, 2, 2)',
                            num: '@integer(1, 10)',
                        }
                    ],
                    'orderInfo': {
                        orderNo: '@datetime("yyyyMMddHHmmssSSS")' + 1,
                        contactName: '@cname',
                        tel: '1831234321',
                        applyTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        account: '@cword(5, 12)',
                        returnAmount: '@float(5, 5000, 2, 2)',
                        status: '@pick([1, 2, 3, 4])',
                        operateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        reason: '@pick(["地址填错", "不喜欢", "不合适", "售后服务差"])',
                        description: '@csentence(30)',
                        'pics|3': ['@image("200x200", "#50B347", "#FFF", "king")'],
                    },
                    'operatesInfo|0-3': [
                        {
                            operateBy: '@cname',
                            operateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            remark: '@cword(10, 20)'
                        }
                    ]
                }
            }
        }
    }
]