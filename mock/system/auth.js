import {nowStr} from "@/utils/timeUtils";

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
        url: '/api/auth/info',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                data: {
                    username: '用户名',
                    phone: '18312344321',
                    address: '深圳',
                    email: '1807431780@qq.com',
                    avatar: 'https://avatars.githubusercontent.com/u/39339029?v=4',
                    gender: 1,
                    qq: '1807431780',
                    weChat: '1807431780',
                    occupation: '程序员',
                    description: '这是系统管理员',
                    lastLoginIp: '127.0.0.1',
                    lastLoginTime: nowStr()
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
                    {
                        "id": 1,
                        "resourceName": "系统管理",
                        "resourceType": 0,
                        "path": "/system",
                        "level": 1,
                        "permission": "system",
                        "parentId": 0,
                        "createTime": "2023-09-07 22:57:29",
                        "updateTime": "2023-10-09 23:47:12",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 5
                    },
                    {
                        "id": 2,
                        "resourceName": "用户管理",
                        "resourceType": 0,
                        "path": "/system/admin",
                        "level": 2,
                        "permission": "system:admin",
                        "parentId": 1,
                        "createTime": "2023-09-07 14:59:58",
                        "updateTime": "2023-10-14 23:56:10",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 1
                    },
                    {
                        "id": 3,
                        "resourceName": "角色管理",
                        "resourceType": 0,
                        "path": "/system/role",
                        "level": 2,
                        "permission": "system:role",
                        "parentId": 1,
                        "createTime": "2023-09-07 14:59:58",
                        "updateTime": "2023-10-09 23:13:11",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 2
                    },
                    {
                        "id": 4,
                        "resourceName": "资源管理",
                        "resourceType": 0,
                        "path": "/system/resource",
                        "level": 2,
                        "permission": "system:resource",
                        "parentId": 1,
                        "createTime": "2023-09-07 14:59:58",
                        "updateTime": "2023-10-09 23:13:17",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 3
                    },
                    {
                        "id": 5,
                        "resourceName": "系统日志管理",
                        "resourceType": 0,
                        "path": "/system/log",
                        "level": 2,
                        "permission": "system:log",
                        "parentId": 1,
                        "createTime": "2023-09-07 15:00:50",
                        "updateTime": "2023-10-09 23:13:27",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 4
                    },
                    {
                        "id": 6,
                        "resourceName": "系统配置管理",
                        "resourceType": 0,
                        "path": "/system/config",
                        "level": 2,
                        "permission": "system:config",
                        "parentId": 1,
                        "createTime": "2023-09-07 15:00:50",
                        "updateTime": "2023-10-14 18:09:15",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 6
                    },
                    {
                        "id": 7,
                        "resourceName": "内容管理",
                        "resourceType": 0,
                        "path": "/product",
                        "level": 1,
                        "permission": "product",
                        "parentId": 0,
                        "createTime": "2023-09-07 15:10:55",
                        "updateTime": "2023-10-09 23:47:50",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 2
                    },
                    {
                        "id": 8,
                        "resourceName": "食品管理",
                        "resourceType": 0,
                        "path": "/product/item",
                        "level": 2,
                        "permission": "product:item",
                        "parentId": 7,
                        "createTime": "2023-09-07 15:10:55",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 9,
                        "resourceName": "食品分类管理",
                        "resourceType": 0,
                        "path": "/product/category",
                        "level": 2,
                        "permission": "product:category",
                        "parentId": 7,
                        "createTime": "2023-09-07 15:10:55",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 10,
                        "resourceName": "套餐管理",
                        "resourceType": 0,
                        "path": "/product/package",
                        "level": 2,
                        "permission": "product:package",
                        "parentId": 7,
                        "createTime": "2023-09-07 15:10:55",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 11,
                        "resourceName": "食品配料管理",
                        "resourceType": 0,
                        "path": "/product/material",
                        "level": 2,
                        "permission": "product:material",
                        "parentId": 7,
                        "createTime": "2023-09-07 15:11:39",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 12,
                        "resourceName": "添加用户",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "system:admin:add",
                        "parentId": 2,
                        "createTime": "2023-09-07 15:14:28",
                        "updateTime": "2023-10-15 00:00:52",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 0
                    },
                    {
                        "id": 13,
                        "resourceName": "删除用户",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "system:admin:delete",
                        "parentId": 2,
                        "createTime": "2023-09-07 15:14:28",
                        "updateTime": "2023-10-15 00:00:59",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 0
                    },
                    {
                        "id": 14,
                        "resourceName": "修改用户",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "system:admin:update",
                        "parentId": 2,
                        "createTime": "2023-09-07 15:19:45",
                        "updateTime": "2023-10-15 00:01:04",
                        "createBy": null,
                        "updateBy": "admin",
                        "sort": 0
                    },
                    {
                        "id": 15,
                        "resourceName": "添加食品",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "product:item:add",
                        "parentId": 8,
                        "createTime": "2023-09-07 15:19:45",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 16,
                        "resourceName": "删除食品",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "product:item:delete",
                        "parentId": 8,
                        "createTime": "2023-09-07 15:19:45",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 17,
                        "resourceName": "修改食品",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "product:item:update",
                        "parentId": 8,
                        "createTime": "2023-09-07 15:19:45",
                        "updateTime": null,
                        "createBy": null,
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 22,
                        "resourceName": "查看食品详情",
                        "resourceType": 1,
                        "path": null,
                        "level": null,
                        "permission": "product:item:view",
                        "parentId": 8,
                        "createTime": "2023-10-09 22:04:34",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 24,
                        "resourceName": "订单管理",
                        "resourceType": 0,
                        "path": "/order",
                        "level": 1,
                        "permission": "order",
                        "parentId": 0,
                        "createTime": "2023-10-09 22:33:18",
                        "updateTime": "2023-10-09 23:47:42",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 3
                    },
                    {
                        "id": 26,
                        "resourceName": "营销管理",
                        "resourceType": 0,
                        "path": "/marketing",
                        "level": 1,
                        "permission": "marketing",
                        "parentId": 0,
                        "createTime": "2023-10-09 22:37:52",
                        "updateTime": "2023-10-09 23:47:33",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 4
                    },
                    {
                        "id": 27,
                        "resourceName": "订单列表",
                        "resourceType": 0,
                        "path": "/order/list",
                        "level": 2,
                        "permission": "order:list",
                        "parentId": 24,
                        "createTime": "2023-10-09 22:38:49",
                        "updateTime": "2023-10-14 18:18:33",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 1
                    },
                    {
                        "id": 28,
                        "resourceName": "添加角色",
                        "resourceType": 1,
                        "path": "/system/role",
                        "level": null,
                        "permission": "system:role:add",
                        "parentId": 3,
                        "createTime": "2023-10-09 22:45:34",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 29,
                        "resourceName": "删除角色",
                        "resourceType": 1,
                        "path": "/system/role",
                        "level": null,
                        "permission": "system:role:delete",
                        "parentId": 3,
                        "createTime": "2023-10-09 22:46:13",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 30,
                        "resourceName": "修改角色",
                        "resourceType": 1,
                        "path": "/system/role",
                        "level": null,
                        "permission": "system:role:update",
                        "parentId": 3,
                        "createTime": "2023-10-09 22:46:46",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 31,
                        "resourceName": "添加资源",
                        "resourceType": 1,
                        "path": "/system/resource",
                        "level": null,
                        "permission": "system:resource:add",
                        "parentId": 4,
                        "createTime": "2023-10-09 22:48:48",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 32,
                        "resourceName": "修改资源",
                        "resourceType": 1,
                        "path": "/system/resource",
                        "level": null,
                        "permission": "system:resource:update",
                        "parentId": 4,
                        "createTime": "2023-10-09 22:49:27",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 0
                    },
                    {
                        "id": 33,
                        "resourceName": "删除资源",
                        "resourceType": 1,
                        "path": "/system/resource",
                        "level": null,
                        "permission": "system:resource:delete",
                        "parentId": 4,
                        "createTime": "2023-10-09 22:49:44",
                        "updateTime": "2023-10-09 22:50:01",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 0
                    },
                    {
                        "id": 34,
                        "resourceName": "系统文件管理",
                        "resourceType": 0,
                        "path": "/system/file",
                        "level": null,
                        "permission": "system:file",
                        "parentId": 1,
                        "createTime": "2023-10-14 18:08:56",
                        "updateTime": "2023-10-14 18:09:21",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 5
                    },
                    {
                        "id": 35,
                        "resourceName": "优惠券管理",
                        "resourceType": 0,
                        "path": "/marketing/coupon",
                        "level": null,
                        "permission": "marketing:coupon",
                        "parentId": 26,
                        "createTime": "2023-10-14 18:13:36",
                        "updateTime": "2023-10-14 18:15:08",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 2
                    },
                    {
                        "id": 36,
                        "resourceName": "广告管理",
                        "resourceType": 0,
                        "path": "/marketing/advertise",
                        "level": null,
                        "permission": "marketing:advertise",
                        "parentId": 26,
                        "createTime": "2023-10-14 18:14:56",
                        "updateTime": null,
                        "createBy": "admin",
                        "updateBy": null,
                        "sort": 1
                    },
                    {
                        "id": 37,
                        "resourceName": "退货申请管理",
                        "resourceType": 0,
                        "path": "/order/returnApply",
                        "level": null,
                        "permission": "order:returnApply",
                        "parentId": 24,
                        "createTime": "2023-10-14 18:16:46",
                        "updateTime": "2023-10-14 18:17:40",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 2
                    },
                    {
                        "id": 38,
                        "resourceName": "退货原因管理",
                        "resourceType": 0,
                        "path": "/order/returnReason",
                        "level": null,
                        "permission": "order:returnReason",
                        "parentId": 24,
                        "createTime": "2023-10-14 18:17:00",
                        "updateTime": "2023-10-14 18:18:06",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 3
                    },
                    {
                        "id": 39,
                        "resourceName": "订单配置管理",
                        "resourceType": 0,
                        "path": "/order/setting",
                        "level": null,
                        "permission": "order:setting",
                        "parentId": 24,
                        "createTime": "2023-10-14 18:17:13",
                        "updateTime": "2023-10-14 18:18:26",
                        "createBy": "admin",
                        "updateBy": "admin",
                        "sort": 4
                    }
                ]
            }
        }
    },
    {
        url: '/api/auth/logout',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '登出成功',
                data: null
            }
        }
    }
]