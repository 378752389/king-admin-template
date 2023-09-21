import request from "@/utils/request";


export const getLogPage = ({pageNum = 1, pageSize = 10, createTime, createBy}) => {
    return request({
        url: '/log',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            createBy,
            createTime
        },
        data: {
            name: 'test'
        }
    })
}