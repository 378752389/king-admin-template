import request from "@/utils/request";

export const getMaterialPageApi = ({pageNum = 1, pageSize = 10, name}) => {
    return request({
        url: '/material',
        method: 'get',
        params: {
            pageNum,
            pageSize,

            name
        },
    })
}

export const addMaterialApi = (material) => {
    return request({
        url: '/material',
        method: 'post',
        data: {...material}
    })
}

export const updateMaterialApi = (material) => {
    return request({
        url: '/material',
        method: 'put',
        data: {...material}
    })
}

// materialIds 为 数组（Array）
export const deleteMaterialApi = (id) => {
    return request({
        url: '/material',
        method: 'delete',
        data: {
            id
        }
    })
}

export const switchMaterialPublishStatusApi = (status) => {
    return request({
        url: '/material/status',
        method: 'post',
        data: {
            status
        }
    })
}