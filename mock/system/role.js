export default [
    {
        url: '/api/role',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    'dataList|10': [
                        {
                            'id|+1': 1,
                            'roleName': '@cname',
                            'address': '@county',
                            'createTime': '@datetime(yyyy-MM-dd HH:mm:ss)',
                        }
                    ]
                }
            }
        }
    }
]