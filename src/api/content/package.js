import request from "@/utils/request";

export const getPackagePage = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/package',
        method: 'get',
        params: {
            pageNum,
            pageSize
        },
    })
}

export const addPackage = ({pkg}) => {
    return request({
        url: '/package',
        method: 'post',
        data: {...pkg}
    })
}

export const updatePackage = (pkg) => {
    return request({
        url: '/package',
        method: 'put',
        data: {...pkg}
    })
}

// packageIds 为 数组（Array）
export const deletePackage = (packageIds) => {
    return request({
        url: '/package',
        method: 'delete',
        data: {
            ids: packageIds
        }
    })
}

export const switchPackagePublishStatus = (status) => {
    return request({
        url: '/package/status',
        method: 'post',
        data: {
            status
        }
    })
}