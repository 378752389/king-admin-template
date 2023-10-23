export default [
    {
        url: `/api/product`,
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
                            'name': query.username ? query.username : '@cname',
                            'price': '@float(10, 100, 2, 2)',
                            'description': '@csentence(20)',
                            'publish': '@pick([0, 1])',
                            'categoryId': 0,
                            pic: function () {
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
    }
]