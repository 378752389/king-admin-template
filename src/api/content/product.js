import request from "@/utils/request";

export const getProductPage = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/product',
        method: 'get',
        params: {
            pageNum,
            pageSize
        },
    })
}

export const addProduct = ({pkg}) => {
    return request({
        url: '/product',
        method: 'post',
        data: {...pkg}
    })
}

export const updateProduct = (pkg) => {
    return request({
        url: '/product',
        method: 'put',
        data: {...pkg}
    })
}

// productIds 为 数组（Array）
export const deleteProduct = (productIds) => {
    return request({
        url: '/product',
        method: 'delete',
        data: {
            ids: productIds
        }
    })
}

export const switchProductPublishStatus = (status) => {
    return request({
        url: '/product/status',
        method: 'post',
        data: {
            status
        }
    })
}