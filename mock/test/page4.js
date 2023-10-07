export default [
    {
        url: `/api/test/page4`,
        method: 'get',
        response: ({query}) => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize || 10}`]: [
                        {
                            'id|+1': 1,
                            'item1': '@ip',
                            'item2': '@county',
                            'item3': '@csentence(20)',
                            'item4': '@url',
                            'item5': '@email',
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