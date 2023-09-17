import request from "@/utils/request";

export const loginByForm = ({username, password}) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return request({
        url: '/login',
        method: 'post',
        data: formData
    })
}