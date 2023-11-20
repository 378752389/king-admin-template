import request from "@/utils/request";

export const getCouponPageApi = ({pageNum = 1, pageSize = 10, name, startTime, endTime}) => {
    return request({
        url: '/coupon',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            name,
            startTime,
            endTime
        },
    })
}

export const getCouponDetailApi = (id) => {
    return request({
        url: `/coupon/${id}`,
        method: 'get'
    })
}

export const addCouponApi = ({coupon}) => {
    return request({
        url: '/coupon',
        method: 'post',
        data: {...coupon}
    })
}

export const updateCouponApi = (coupon) => {
    return request({
        url: '/coupon',
        method: 'put',
        data: {...coupon}
    })
}

// couponIds 为 数组（Array）
export const deleteCouponApi = (couponIds) => {
    return request({
        url: '/coupon',
        method: 'delete',
        data: {
            ids: couponIds
        }
    })
}