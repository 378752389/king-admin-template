export const permissionData = {
    "resourceList": [
        {
            "id": 1,
            "level": 1,
            "parentId": 0,
            "permission": "system",
            "resourceName": "系统管理",
            "resourceType": 0
        },
        {
            "id": 2,
            "level": 2,
            "parentId": 1,
            "permission": "system:user",
            "resourceName": "用户管理",
            "resourceType": 0
        },
        {
            "id": 3,
            "level": 2,
            "parentId": 1,
            "permission": "system:role",
            "resourceName": "角色管理",
            "resourceType": 0
        },
        {
            "id": 4,
            "level": 2,
            "parentId": 1,
            "permission": "system:resource",
            "resourceName": "资源管理",
            "resourceType": 0
        },
        {
            "id": 5,
            "level": 2,
            "parentId": 1,
            "permission": "system:log",
            "resourceName": "系统日志管理",
            "resourceType": 0
        },
        {
            "id": 6,
            "level": 2,
            "parentId": 1,
            "permission": "system:config",
            "resourceName": "系统配置管理",
            "resourceType": 0
        },
        {
            "id": 7,
            "level": 1,
            "parentId": 0,
            "permission": "food",
            "resourceName": "内容管理",
            "resourceType": 0
        },
        {
            "id": 8,
            "level": 2,
            "parentId": 7,
            "permission": "food:item",
            "resourceName": "食品管理",
            "resourceType": 0
        },
        {
            "id": 9,
            "level": 2,
            "parentId": 7,
            "permission": "food:category",
            "resourceName": "食品分类管理",
            "resourceType": 0
        },
        {
            "id": 10,
            "level": 2,
            "parentId": 7,
            "permission": "food:package",
            "resourceName": "套餐管理",
            "resourceType": 0
        },
        {
            "id": 11,
            "level": 2,
            "parentId": 7,
            "permission": "food:material",
            "resourceName": "食品配料管理",
            "resourceType": 0
        },
        {
            "id": 12,
            "parentId": 2,
            "permission": "system:user:add",
            "resourceName": "添加用户",
            "resourceType": 1
        },
        {
            "id": 13,
            "parentId": 2,
            "permission": "system:user:delete",
            "resourceName": "删除用户",
            "resourceType": 1
        },
        {
            "id": 14,
            "parentId": 2,
            "permission": "system:user:update",
            "resourceName": "修改用户",
            "resourceType": 1
        },
        {
            "id": 15,
            "parentId": 8,
            "permission": "food:item:add",
            "resourceName": "添加食品",
            "resourceType": 1
        },
        {
            "id": 16,
            "parentId": 8,
            "permission": "food:item:delete",
            "resourceName": "删除食品",
            "resourceType": 1
        },
        {
            "id": 17,
            "parentId": 8,
            "permission": "food:item:update",
            "resourceName": "修改食品",
            "resourceType": 1
        }
    ],
    "uid": 1,
    "username": "admin"
}