const BASE_URL = '/api';
export default [
    {
        url: `${BASE_URL}/role/list`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                'data|10': [
                    {
                        'id|+1': 1,
                        'roleName': query.roleName ? query.roleName : '@cname',
                        'address': '@county',
                        'createTime': '@datetime(yyyy-MM-dd HH:mm:ss)',
                    }
                ]
            }
        }
    }
]