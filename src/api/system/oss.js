import request from "@/utils/request";


export const getUploadFileUrlApi = (filename, scene, autoPath = false) => {
    return request({
        url: '/oss/upload/url',
        method: 'get',
        params: {
            filename,
            scene,
            autoPath
        }
    })
}


export const uploadFileApi = (url, file) => {
    return new Promise(resolve => {
        fetch(url, {
            method: 'put',
            body: file
        }).then(res => {
            resolve(res)
        })
    })
}