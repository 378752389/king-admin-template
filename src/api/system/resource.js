import request from "@/utils/request";

export const resourceReq = {

}
export const getResourcePage = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/resource',
        method: 'get',
        params: {
            pageNum,
            pageSize
        },
    })
}

/**
 * 获取所有资源列表，并且以树形结构返回
 */
export const getResourceList = () => {
    return request({
        url: '/resource/all',
        method: 'get'
    })
}

export const getResourceListByRoleId = (roleId) => {
    return request({
        url: '/resource/all',
        method: 'get',
        params: {
            roleId
        }
    })
}

export const addResource = (resource) => {
    return request({
        url: '/resource',
        method: 'post',
        data: {...resource}
    })
}

export const updateResource = (resource) => {
    return request({
        url: '/resource',
        method: 'put',
        data: {...resource}
    })
}

// roleIds 为 数组（Array）
export const removeResource = (roleIds) => {
    return request({
        url: '/resource',
        method: 'delete',
        data: {
            ids: roleIds
        }
    })
}