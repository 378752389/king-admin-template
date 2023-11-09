export default [
    {
        url: `/api/material`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            'name': query.name ? query.name : '@cname',
                            pic: '@image("300x300")',
                            'description': '@csentence(20)',
                            'publish': '@pick([0, 1])',
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