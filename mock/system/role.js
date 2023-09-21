const BASE_URL = '/api';
export default [
    {
        url: `${BASE_URL}/role`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize}`]: [
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