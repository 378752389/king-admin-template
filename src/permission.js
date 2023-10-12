import router from '@/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {useUserInfoStore} from "@/stores/userInfo";

//白名单列表
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    // console.log(to, from, next)
    NProgress.start();
    // 白名单列表，所有用户都可访问
    if (whiteList.indexOf(to.path) !== -1) {
        next();
    }
    const token = localStorage.getItem("token");
    if (token == null || token === '') {
        next('/login');
    }

    // 判断目标路由是否有权限
    if (to.meta && to.meta.permission) {
        // 判断用户是否拥有对应的权限
        const userInfoStore = useUserInfoStore();
        if (userInfoStore.permissionList && userInfoStore.permissionList.indexOf(to.meta.permission) !== -1) {
            // 用户拥有对应菜单权限
            next()
        } else {
            // 用户没有权限，跳转到登录页
            next('/common/401')
        }
    } else {
        // 页面没有权限，可以直接跳转
        next();
    }
})

router.afterEach(() => {
    NProgress.done();
})