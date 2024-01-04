import request from "@/utils/request";

export const getPackagePageApi = ({pageNum = 1, pageSize = 10, name, categoryId}) => {
    return request({
        url: '/package',
        method: 'get',
        params: {
            pageNum,
            pageSize,

            name,
            categoryId
        },
    })
}

export const getPackageDetailApi = (id) => {
    return request({
        url: `/package/${id}`,
        method: 'get',
    })
}

export const addPackageApi = (pkg) => {
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

export const updatePackageStockApi = ({id, stock, lowStock, promotionPrice}) => {
    return request({
        url: '/package/stock',
        method: 'post',
        data: {
            id,
            stock,
            lowStock,
            promotionPrice
        }
    })
}

// packageIds 为 数组（Array）
export const deletePackageApi = (id) => {
    return request({
        url: `/package/${id}`,
        method: 'delete',
    })
}

export const switchPackagePublishStatusApi = (id, publish) => {
    return request({
        url: '/package/status',
        method: 'post',
        data: {
            id,
            publish
        }
    })
}