import request from "@/utils/request";

export const resourceReq = {}
export const getResourceTreeApi = (roleId) => {
    return request({
        url: '/resource/tree',
        method: 'get',
        params: {
            roleId
        }
    })
}

/**
 * 获取所有资源列表，并且以树形结构返回
 */
export const getResourceListApi = (roleId) => {
    return request({
        url: '/resource/list',
        method: 'get',
        params: {
            roleId
        }
    })
}

export const addResourceApi = (resource) => {
    return request({
        url: '/resource',
        method: 'post',
        data: {...resource}
    })
}

export const updateResourceApi = (resource) => {
    return request({
        url: '/resource',
        method: 'put',
        data: {...resource}
    })
}

// roleIds 为 数组（Array）
export const deleteResourceApi = (resourceId) => {
    return request({
        url: `/resource/${resourceId}`,
        method: 'delete'
    })
}