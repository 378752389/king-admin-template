import request from "@/utils/request";

export const getOrderPage = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/order',
        method: 'get',
        params: {
            pageNum,
            pageSize,
        },
    })
}

export const updateOrder = (order) => {
    return request({
        url: '/order',
        method: 'put',
        data: {...order}
    })
}

// orderIds 为 数组（Array）
export const deleteOrder = (orderIds) => {
    return request({
        url: '/order',
        method: 'delete',
        data: {
            ids: orderIds
        }
    })
}