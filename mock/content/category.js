const BASE_URL = '/api';
const prefix = `${BASE_URL}/category`
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
        url: prefix,
        method: 'get',
        response: ({query}) => {
            console.log("【数据查询成功】，查询参数：", query)
            let i = 1;
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize}`]: [
                        {
                            'description': '@title',
                            'id|+1': 1,
                            parentId: 0,
                            'sort|+1': 0,
                            type: '@pick([1, 2])',
                            name: '@cword(5, 12)',
                            level: 1,
                            count: '@natural(1, 20)',
                            'publish|1': 1,
                            icon: '@pick(["menu", "location", "user"])',
                        }
                    ],
                    'pageNum': parseInt(query.pageNum),
                    'pageSize': parseInt(query.pageSize),
                    'total': 100
                }
            }
        }
    },
    {
        url: `${prefix}/list`,
        method: 'get',
        response: () => {
            let i = 1;
            return {
                code: 200,
                message: '请求成功',
                'data|5': [
                    {
                        'description': '@title',
                        'id|+1': 1,
                        parentId: 0,
                        'order|+1': 0,
                        name: '@cword(5, 12)',
                        level: 1,
                        type: '@pick([1, 2])',
                        count: '@natural(1, 20)',
                        'publish|1': 1,
                        icon: '@pick(["menu", "location", "user"])',
                    }
                ],
            }
        }
    },
    // 提交请求
    {
        url: prefix,
        method: 'post',
        response: ({body}) => {
            console.log("【数据创建成功】，请求体：", body)
            return {
                code: 200,
                message: '请求成功',
                data: null
            }
        }
    },
    // 更新请求
    {
        url: prefix,
        method: 'put',
        response: ({body}) => {
            console.log("【数据修改成功】，请求体：", body)
            return {
                code: 200,
                message: '请求成功',
                data: null
            }
        }
    },
    // 删除请求
    {
        url: prefix,
        method: 'delete',
        response: ({query}) => {
            console.log("【数据删除成功】，查询参数：", query)
            return {
                code: 200,
                message: '请求成功',
                data: null
            }
        }
    },
    {
        url: `${prefix}/public`,
        method: 'post',
        response: ({query}) => {
            console.log("【修改数据状态成功】，查询参数：", query)
            return {
                code: 200,
                message: '修改数据状态成功',
                data: null
            }
        }
    }
]