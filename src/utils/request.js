import axios from "axios";
import router from '@/router';
import lodash from 'lodash';
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL,
    timeout: 3000,
    headers: {
        'X-Customer-System': 'king-admin-template'
    },
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 去除为空的查询参数
    config.params = lodash.pickBy(config.params, item => item)
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

let hint = false;
// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(`[响应拦截器拦截] 请求路径: ${response.config.url}, 响应结果：`, response)

    const result = response.data;

    // 获取当前页面跳转的路由
    // console.log(router.currentRoute.value.fullPath)
    switch (result.code) {
        case 200:
            // 返回接口的响应结果
            return result;
        case 400:
            // 业务异常
            ElMessage.error(result.message)
            return
        case 401:
            // token失效导致多次提示
            if (hint) {
                return
            }
            hint = true
            setTimeout(() => hint = false, 3000)
            ElMessage.info("token无效或过期")
            // 移除旧 token
            localStorage.removeItem('token')
            // 保存当前页，跳转登录页， 登录成功跳转到 当前页
            sessionStorage.setItem('redirect', router.currentRoute.value.fullPath)
            // router.push 返回一个 promise对象， 结果为 undefined
            // 跳转到登录页
            return router.push({name: 'login'})
        case 403:
            // 没有权限访问接口
            ElMessage.info(result.message)
            return
        case 500:
            // 服务器运行错误
            ElMessage.warning(result.message)
            return
        default:
            // 其他状态码，给予提示，并按照正常返回处理
            ElMessage.warning(result.message)
            return result
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 服务器错误 eg：
    // 404  接口不存在
    // 500  后台服务器问题
    ElMessage.error(error.message)
});

export default request;