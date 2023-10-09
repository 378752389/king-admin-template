import {defineStore} from 'pinia';
import {ref} from 'vue';
import {loginApi, menuApi} from "@/api/system/auth";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'


export const useUserInfoStore = defineStore("userInfo", () => {
    const menuList = ref([])
    const router = useRouter()

    const doLogin = async ({username, password}) => {
        // 分页获取用户列表数据

        try {
            const result = await loginApi({
                username,
                password
            })
            if (result && result.code !== 200) {
                console.log(result)
                ElMessage({
                    showClose: true,
                    message: result.message || '用户名或密码错误',
                    type: 'error',
                })
                return
            }
            if (result && result.code === 200) {
                localStorage.setItem('token', result.data.token);
                ElMessage({
                    showClose: true,
                    message: '登录成功',
                    type: 'success',
                })
                await router.replace({path: '/'})
            } else {
                ElMessage({
                    message: result.message,
                    type: 'warning',
                })
            }
        } catch (e) {
            ElMessage({
                type: 'error',
                message: "登录失败，请联系开发人员"
            })
            console.log(e);
        }
    }

    const getMenu = async () => {
        const menuResult = await menuApi();
        if (menuResult.code === 200) {
            menuList.value = menuResult.data;
        }
    }

    // 清除用户信息
    const clearToken = function () {
        localStorage.setItem('token', '');
    }

    return {
        menuList,
        clearToken,
        doLogin,
        getMenu
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

