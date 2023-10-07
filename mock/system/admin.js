const BASE_URL = '/api';
export default [
    {
        url: `${BASE_URL}/admin`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            'username': query.username ? query.username : '@cname',
                            'address': '@county',
                            'description': '@csentence(20)',
                            'url': '@url',
                            'email': '@email',
                            'ip': '@ip'
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