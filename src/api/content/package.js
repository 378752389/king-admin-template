import request from "@/utils/request";

export const getPackagePageApi = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/package',
        method: 'get',
        params: {
            pageNum,
            pageSize
        },
    })
}

export const getPackageDetailApi = (id) => {
    return request({
        url: `/package/${id}`,
        method: 'get',
    })
}

export const addPackageApi = ({pkg}) => {
    return request({
        url: '/package',
        method: 'post',
        data: {...pkg}
    })
}

export const updatePackageApi = (pkg) => {
    return request({
        url: '/package',
        method: 'put',
        data: {...pkg}
    })
}

// packageIds 为 数组（Array）
export const deletePackageApi = (packageIds) => {
    return request({
        url: '/package',
        method: 'delete',
        data: {
            ids: packageIds
        }
    })
}

export const switchPackagePublishStatusApi = (status) => {
    return request({
        url: '/package/status',
        method: 'post',
        data: {
            status
        }
    })
}