import request from "@/utils/request";

export const getCouponPageApi = ({pageNum = 1, pageSize = 10, name, type}) => {
    return request({
        url: '/coupon',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            name,
            type
        },
    })
}

export const getCouponDetailApi = (id) => {
    return request({
        url: `/coupon/${id}`,
        method: 'get'
    })
}

export const addCouponApi = (coupon) => {
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
export const deleteCouponApi = (id) => {
    return request({
        url: `/coupon/${id}`,
        method: 'delete',
    })
}


export const getCouponRecordDetailApi = (id, {pageNum, pageSize, memberNickname, orderNo, useStatus}) => {
    return request({
        url: `/coupon/record/${id}`,
        method: 'get',
        params: {
            pageNum,
            pageSize,

            memberNickname,
            orderNo,
            useStatus,
        }
    })
}