import request from "@/utils/request";

export const roleReq = {
    id: '',
    roleName: '',
    resourceIds: [],
}
export const getRolePageApi = ({pageNum, pageSize, roleName}) => {
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
export const getRoleListApi = ({roleName}) => {
    return request({
        url: '/role/list',
        method: 'get',
        params: {
            roleName
        }
    })
}

export const addRoleApi = (role) => {
    return request({
        url: '/role',
        method: 'post',
        data: {...role}
    })
}

export const updateRoleApi = (role) => {
    return request({
        url: '/role',
        method: 'put',
        data: {...role}
    })
}

// roleIds 为 数组（Array）
export const deleteRoleApi = (roleId) => {
    return request({
        url: `/role/${roleId}`,
        method: 'delete'
    })
}