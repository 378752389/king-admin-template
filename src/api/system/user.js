import request from "@/utils/request";

export const userReq = {

}
export const getUserPage = ({pageNum = 1, pageSize = 10, username}) => {
    return request({
        url: '/user',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            username,
        },
    })
}


export const addUser = (user) => {
    return request({
        url: '/user',
        method: 'post',
        data: {...user}
    })
}

export const updateUser = (user) => {
    return request({
        url: '/user',
        method: 'put',
        data: {...user}
    })
}

// roleIds 为 数组（Array）
export const removeUser = (roleIds) => {
    return request({
        url: '/user',
        method: 'delete',
        data: {
            ids: roleIds
        }
    })
}