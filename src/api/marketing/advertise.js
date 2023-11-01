import request from "@/utils/request";

export const getAdvertisePage = ({pageNum = 1, pageSize = 10, name, startTime, endTime}) => {
    return request({
        url: '/advertise',
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

export const addAdvertise = ({advertise}) => {
    return request({
        url: '/advertise',
        method: 'post',
        data: {...advertise}
    })
}

export const updateAdvertise = (advertise) => {
    return request({
        url: '/advertise',
        method: 'put',
        data: {...advertise}
    })
}

// advertiseIds 为 数组（Array）
export const deleteAdvertise = (advertiseIds) => {
    return request({
        url: '/advertise',
        method: 'delete',
        data: {
            ids: advertiseIds
        }
    })
}

export const switchAdvertisePublishStatus = (status) => {
    return request({
        url: '/advertise/status',
        method: 'post',
        data: {
            status
        }
    })
}