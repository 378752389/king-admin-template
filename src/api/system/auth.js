import request from "@/utils/request";

/**
 * 登录接口
 * @param username
 * @param password
 * @returns {*}
 */
export const loginApi = ({username, password}) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return request({
        url: '/auth/login',
        method: 'post',
        data: formData
    })
}

/**
 * 获取当前登录用户信息
 * @returns {*}
 */
export const infoApi = () => {
    return request({
        url: '/auth/info',
        method: 'get'
    })
}

/**
 * 获取角色权限菜单
 * @returns {*}
 */
export const menuApi = () => {
    return request({
        url: '/auth/menu',
        method: 'get'
    })
}

/**
 * 登录操作
 * @returns {*}
 */
export const logoutApi = () => {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}