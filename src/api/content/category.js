import request from "@/utils/request";

export const getCategoryPageApi = ({pageNum = 1, pageSize = 10, type, name}) => {
    return request({
        url: '/category',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            name,
            type
        },
    })
}

export const getCategoryListApi = () => {
    return request({
        url: '/category/all',
        method: 'get'
    })
}

export const addCategoryApi = (category) => {
    return request({
        url: '/category',
        method: 'post',
        data: {...category}
    })
}

export const updateCategoryApi = (category) => {
    return request({
        url: '/category',
        method: 'put',
        data: {...category}
    })
}

// categoryIds 为 数组（Array）
export const removeCategoriesApi = (id) => {
    return request({
        url: `/category/${id}`,
        method: 'delete',
    })
}

export const switchCategoryPublicStatusApi = ({id, publish}) => {
    return request({
        url: '/category/status',
        method: 'post',
        data: {
            id,
            publish
        }
    })
}