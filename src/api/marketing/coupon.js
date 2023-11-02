import request from "@/utils/request";

export const getCouponPage = ({pageNum = 1, pageSize = 10, name, startTime, endTime}) => {
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

export const addCoupon = ({coupon}) => {
    return request({
        url: '/coupon',
        method: 'post',
        data: {...coupon}
    })
}

export const updateCoupon = (coupon) => {
    return request({
        url: '/coupon',
        method: 'put',
        data: {...coupon}
    })
}

// couponIds 为 数组（Array）
export const deleteCoupon = (couponIds) => {
    return request({
        url: '/coupon',
        method: 'delete',
        data: {
            ids: couponIds
        }
    })
}