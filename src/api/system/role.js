import request from "@/utils/request";

export const roleReq = {
    id: '',
    roleName: '',
    resourceIds: [],
}
export const getRolePage = ({pageNum, pageSize, roleName}) => {
    return request({
        url: '/role',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            roleName
        },
    })
}


/**
 * 获取所有角色列表
 */
export const getRoleList = () => {
    return request({
        url: '/role/all',
        method: 'get'
    })
}

export const addRole = (role) => {
    return request({
        url: '/role',
        method: 'post',
        data: {...role}
    })
}

export const updateRole = (role) => {
    return request({
        url: '/role',
        method: 'put',
        data: {...role}
    })
}

// roleIds 为 数组（Array）
export const removeRoles = (roleIds) => {
    return request({
        url: '/role',
        method: 'delete',
        data: {
            ids: roleIds
        }
    })
}