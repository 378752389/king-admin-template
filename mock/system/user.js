const BASE_URL = '/api';
export default [
    {
        url: `${BASE_URL}/user`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize}`]: [
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