import request from "@/utils/request";

export const getCategoryPage = ({pageNum = 1, pageSize = 10}) => {
    return request({
        url: '/category',
        method: 'get',
        params: {
            pageNum,
            pageSize
        },
    })
}


/**
 * 获取所有角色列表
 */
export const getCategoryList = () => {
    return request({
        url: '/category/all',
        method: 'get'
    })
}

export const addCategory = (category) => {
    return request({
        url: '/category',
        method: 'post',
        data: {...category}
    })
}

export const updateCategory = (category) => {
    return request({
        url: '/category',
        method: 'put',
        data: {...category}
    })
}

// categoryIds 为 数组（Array）
export const removeCategories = (categoryIds) => {
    return request({
        url: '/category',
        method: 'delete',
        data: {
            ids: categoryIds
        }
    })
}