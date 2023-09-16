import request from "@/utils/request";


export const getUserList = () => {
    return request({
        url: '/user',
        method: 'get',
        params: {
            pageNum: 1,
            pageSize: 10
        }
    })
}