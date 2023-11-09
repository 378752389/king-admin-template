import request from "@/utils/request";

export const getOrderPageApi = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/order',
        method: 'get',
        params: {
            pageNum,
            pageSize,
        },
    })
}

export const getOrderDetailApi = (id) => {
    return request({
        url: `/order/${id}`,
        method: 'get',
    })
}

export const updateOrderApi = (order) => {
    return request({
        url: '/order',
        method: 'put',
        data: {...order}
    })
}

// orderIds 为 数组（Array）
export const deleteOrderApi = (orderIds) => {
    return request({
        url: '/order',
        method: 'delete',
        data: {
            ids: orderIds
        }
    })
}