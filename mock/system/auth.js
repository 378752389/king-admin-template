/**
 * response 返回的对象四个属性：
 *  headers：请求头，对象；eg: {Content-Type: "application/json"}
 *  query: 查询参数，对象；eg: {name: 'king'}
 *  body: 请求体， 对象； eg: {name: 'king'}
 *  method: 请求方式， 大写字符串； eg："GET"
 */
export default [
    // 分页查询
    {
        url: '/api/auth/login',
        method: 'post',
        response: ({query}) => {
            console.log("【数据查询成功】，查询参数：", query)
            return {
                code: 200,
                message: '请求成功',
                data: {
                    token: "hello, world!"
                }
            }
        }
    },
    {
        url: '/api/auth/menu',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                data: [
                    // todo 请求获取的菜单列表
                ]
            }
        }
    }
]