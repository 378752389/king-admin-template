import request from "@/utils/request";


export const getFilePageApi = ({pageNum = 1, pageSize = 10,bizType, srcName, uploadTime, uploadBy}) => {
    return request({
        url: '/file',
        method: 'get',
        params: {
            pageNum,
            pageSize,
            srcName,
            bizType,
            uploadTime,
            uploadBy
        }
    })
}

export const getFileTypeApi = () => {
    return request({
        url: '/file/type',
        method: 'get'
    })
}