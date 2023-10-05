import request from "@/utils/request";

export const adminReq = {
    username: '',
    password: '',
}
export const getAdminPage = ({pageNum, pageSize, username}) => {
    return request({
        url: '/admin',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            username,
        },
    })
}

export const getAdmin = (id) => {
    return request({
        url: `/admin/${id}`,
        method: 'get'
    })
}

export const createAdmin = (admin) => {
    return request({
        url: '/admin',
        method: 'post',
        data: {...admin}
    })
}

export const updateAdmin = (admin) => {
    return request({
        url: '/admin',
        method: 'put',
        data: {...admin}
    })
}

// roleIds 为 数组（Array）
export const deleteAdmin = (id) => {
    return request({
        url: `/admin/${id}`,
        method: 'delete'
    })
}