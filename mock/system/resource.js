const BASE_URL = '/api';
const prefix = `${BASE_URL}/resource`
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
        url: '/api/resource/tree',
        method: 'get',
        response: ({query}) => {
            console.log("【数据查询成功】，查询参数：", query)
            let i = 1;
            return {
                code: 200,
                message: '请求成功',
                'data|3': [
                    {
                        'id|+1': 1,
                        'resourceName': '@title',
                        path: '@url',
                        'resourceType|0-1': 1,
                        permission: '',
                        icon: function () {
                            return `https://picsum.photos/id/${i++}/600/600`
                        },
                    }
                ]
            }
        }
    },
]