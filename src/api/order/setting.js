import request from "@/utils/request";

export const getOrderSettingApi = () => {
    return request({
        url: '/order/setting',
        method: 'get',
    })
}

export const updateOrderSettingApi = (returnReason) => {
    return request({
        url: '/order/setting',
        method: 'put',
        data: {...returnReason}
    })
}
