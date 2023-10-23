export default [
    {
        url: `/api/advertise`,
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
                            startTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            endTime: '@now()',
                            'sort|+1': 0,
                            'publish': '@pick([0, 1])',
                            'description': '@csentence(30)',
                            type: '@pick([0, 1, 2])',
                            link: '@url',
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