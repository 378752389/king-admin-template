import request from "@/utils/request";

export const getAdvertisePageApi = ({pageNum = 1, pageSize = 10, name, startTime, endTime}) => {
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

export const addAdvertiseApi = ({advertise}) => {
    return request({
        url: '/advertise',
        method: 'post',
        data: {...advertise}
    })
}

export const updateAdvertiseApi = (advertise) => {
    return request({
        url: '/advertise',
        method: 'put',
        data: {...advertise}
    })
}

// advertiseIds 为 数组（Array）
export const deleteAdvertiseApi = (advertiseIds) => {
    return request({
        url: '/advertise',
        method: 'delete',
        data: {
            ids: advertiseIds
        }
    })
}

export const switchAdvertisePublishStatusApi = (status) => {
    return request({
        url: '/advertise/status',
        method: 'post',
        data: {
            status
        }
    })
}