import request from "@/utils/request";

export const getReturnReasonListApi = () => {
    return request({
        url: '/returnReason',
        method: 'get',
    })
}

export const addReturnReasonApi = (returnReason) => {
    return request({
        url: '/returnReason',
        method: 'post',
        data: {...returnReason}
    })
}

export const updateReturnReasonApi = (returnReason) => {
    return request({
        url: '/returnReason',
        method: 'put',
        data: {...returnReason}
    })
}

// returnReasonIds 为 数组（Array）
export const deleteReturnReasonApi = (returnReasonId) => {
    return request({
        url: '/returnReason',
        method: 'delete',
        data: {
            id: returnReasonId
        }
    })
}

export const switchReturnReasonStatusApi = (enable) => {
    return request({
        url: '/returnReason/status',
        method: 'post',
        data: {
            enable
        }
    })
}