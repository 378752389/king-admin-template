import request from "@/utils/request";

export const getProductPageApi = ({pageNum = 1, pageSize = 10, categoryId, name}) => {
    return request({
        url: '/product',
        method: 'get',
        params: {
            pageNum,
            pageSize,

            name,
            categoryId
        },
    })
}

export const getProductDetailApi = (id) => {
    return request({
        url: `/product/${id}`,
        method: 'get',
    })
}

export const addProductApi = ({product}) => {
    return request({
        url: '/product',
        method: 'post',
        data: {...product}
    })
}

export const updateProductApi = (product) => {
    return request({
        url: '/product',
        method: 'put',
        data: {...product}
    })
}

// productIds 为 数组（Array）
export const deleteProductApi = (productIds) => {
    return request({
        url: '/product',
        method: 'delete',
        data: {
            ids: productIds
        }
    })
}

export const switchProductPublishStatusApi = (status) => {
    return request({
        url: '/product/status',
        method: 'post',
        data: {
            status
        }
    })
}