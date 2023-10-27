import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {loginApi, menuApi, logoutApi, infoApi} from "@/api/system/auth";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'


export const useUserInfoStore = defineStore("userInfo", () => {
    const menuList = ref([])
    const info = ref({})
    const router = useRouter()

    const uploadHeaders = computed(() => {
        return {
            Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : ''
        }
    })

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
                menuList.value = []
                info.value = {}
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

    const permissionList = computed(() => {
        return menuList.value.map(x => x.permission)
    })

    const getMenu = async () => {
        try {
            const menuResult = await menuApi();
            if (menuResult.code === 200) {
                menuList.value = menuResult.data;
            }
        } catch (e) {
            ElMessage.error(e.message)
        }

    }

    const getInfo = async () => {
        try {
            const infoResult = await infoApi();
            if (infoResult.code === 200) {
                info.value = infoResult.data;
            }
        } catch (e) {
            ElMessage.error(e.message)
        }
    }

    return {
        menuList,
        info,
        permissionList,
        uploadHeaders,
        doLogin,
        doLogout,
        getMenu,
        getInfo
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

