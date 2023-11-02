export default [
    {
        url: `/api/returnReason`,
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                'data|8': [{
                    'id|+1': 1,
                    reason: '@cword(8, 20)',
                    'sort|+1': 0,
                    'enable|7-8': true,
                    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
                }]
            }
        }
    }
]