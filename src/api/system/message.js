import request from "@/utils/request";


export const getMessagePage = ({pageNum = 1, pageSize = 10, createTime, type, status}) => {
    return request({
        url: '/message',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            createTime,
            type,
            status
        }
    })
}