import request from "@/utils/request";

export const resourceReq = {

}
export const getResourceTreeApi = () => {
    return request({
        url: '/resource/tree',
        method: 'get'
    })
}

/**
 * 获取所有资源列表，并且以树形结构返回
 */
export const getResourceListApi = () => {
    return request({
        url: '/resource/all',
        method: 'get'
    })
}

export const getResourceListByRoleIdApi = (roleId) => {
    return request({
        url: '/resource/all',
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