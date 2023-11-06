const BASE_URL = '/api';
const prefix = `${BASE_URL}/file`
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
            return {
                code: 200,
                message: '请求成功',
                data: {
                    [`dataList|${query.pageSize}`]: [
                        {
                            'srcName': '@title',
                            mimeType: '@pick(["image/jpg", "image/png", "text/plain"])',
                            bizType: '@pick(["default", "商品", "套餐", "分类"])',
                            fileSizeReadable: '@float(10, 30, 2, 2) + "MB"',
                            uploadTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
                            uploadBy: query.uploadBy || '@cname',
                            link: '@image("300x300")',
                        }
                    ],
                    'pageNum': parseInt(query.pageNum),
                    'pageSize': parseInt(query.pageSize),
                    'total': 100
                }
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