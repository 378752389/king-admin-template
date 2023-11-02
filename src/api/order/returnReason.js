import request from "@/utils/request";

export const getReturnReasonList = () => {
    return request({
        url: '/returnReason',
        method: 'get',
    })
}

export const addReturnReason = (returnReason) => {
    return request({
        url: '/returnReason',
        method: 'post',
        data: {...returnReason}
    })
}

export const updateReturnReason = (returnReason) => {
    return request({
        url: '/returnReason',
        method: 'put',
        data: {...returnReason}
    })
}

// returnReasonIds 为 数组（Array）
export const deleteReturnReason = (returnReasonId) => {
    return request({
        url: '/returnReason',
        method: 'delete',
        data: {
            id: returnReasonId
        }
    })
}