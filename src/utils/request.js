import axios from "axios";
import router from "@/router";

const request = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL,
    timeout: 3000,
    headers: {
        'X-Customer-System': 'king-admin-template'
    },
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300 || status === 302; // 默认值
    // },

})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
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
    // 返回接口的响应结果
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 接口无效，请求跳转到登录页
    if (error.request.responseURL == 'http://localhost:5173/login') {
        router.push('/login')
        return Promise.resolve();
    } else {
        return Promise.reject(error);
    }
    // return Promise.reject(error);

});

export default request;