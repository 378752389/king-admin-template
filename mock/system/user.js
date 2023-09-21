export default [
    {
        url: '/api/user',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    'dataList|10': [
                        {
                            'id|+1': 1,
                            'username': '@cname',
                            'address': '@county',
                            'description': '@csentence(20)',
                            'url': '@url',
                            'email': '@email',
                            'ip': '@ip'
                        }
                    ]
                }
            }
        }
    }
]