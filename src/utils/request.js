import axios from "axios";
import router from '@/router';

const request = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL,
    timeout: 3000,
    headers: {
        'X-Customer-System': 'king-admin-template'
    },
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
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

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(`[响应拦截器拦截] 请求路径: ${response.config.url}, 响应结果：`, response)

    // token 失效，移除token
    const resp = response.data;
    if (resp.code === 401) {
        localStorage.removeItem('token');
        router.push({name: 'login'})
    }

    if (resp.code === 403) {
        router.push({name: '403'})
    }

    // 返回接口的响应结果
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 接口无效，请求跳转到登录页
    return Promise.reject(error);

});

export default request;