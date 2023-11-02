export default [
    {
        url: `/api/order/setting`,
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                'data': {
                    orderTimeout: 60,
                    orderFinishTimeout: 1440
                }
            }
        }
    },
    {
        url: '/api/order/setting',
        method: 'put',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                data: null
            }
        }
    }
]