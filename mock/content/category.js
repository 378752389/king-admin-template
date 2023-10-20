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
                            'order|+1': 0,
                            categoryName: '@title',
                            level: 1,
                            count: '@natural(1, 20)',
                            enable: true,
                            icon: function () {
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
    },
    {
        url: `${prefix}/all`,
        method: 'get',
        response: () => {
            let i = 1;
            return {
                code: 200,
                message: '请求成功',
                'data|10': [
                    {
                        'description': '@title',
                        'id|+1': 1,
                        parentId: 0,
                        'order|+1': 0,
                        categoryName: '@title',
                        level: 1,
                        count: '@natural(1, 20)',
                        enable: true,
                        icon: function () {
                            return `https://picsum.photos/id/${i++}/600/600`
                        },
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
]