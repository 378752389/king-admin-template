import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {loginApi, menuApi, logoutApi} from "@/api/system/auth";
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
            if (result && result.code === 200) {
                localStorage.setItem('token', result.data.token);
                ElMessage({
                    showClose: true,
                    message: '登录成功',
                    type: 'success',
                })
                router.replace({path: '/'})
            } else {
                ElMessage({
                    message: result.message || '登录失败',
                    type: 'error',
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

    const doLogout = async () => {
        try {
            const res = await logoutApi();
            if (res && res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                localStorage.removeItem('token')
                await router.push({name: 'login'})
            }
        } catch (e) {
            ElMessage({
                type: 'error',
                message: e.message || '退出登录失败'
            })
        }
    }

    const getMenu = async () => {
        const menuResult = await menuApi();
        if (menuResult.code === 200) {
            menuList.value = menuResult.data;
        }
    }

    const permissionList = computed(() => {
        return menuList.value.map(menu => menu.permission)
    })


    return {
        menuList,
        permissionList,
        doLogin,
        doLogout,
        getMenu
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

