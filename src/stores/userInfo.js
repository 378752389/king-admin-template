import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {loginApi, menuApi, logoutApi, infoApi} from "@/api/system/auth";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'
import {getUrlParams} from "@/utils/urlUtils";


export const useUserInfoStore = defineStore("userInfo", () => {
    const menuList = ref([])
    const info = ref({})
    const router = useRouter()
    const token = ref('')

    const uploadHeaders = computed(() => {
        return {
            Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : ''
        }
    })

    const doLogin = async ({username, password, rememberMe}) => {
        // 分页获取用户列表数据

        try {
            const result = await loginApi({
                username,
                password
            })
            if (result && result.code === 200) {
                const t = result.data.token
                token.value = t
                localStorage.setItem('token', t)
                // 记住我功能是否勾选, 勾选则存储token
                if (rememberMe) {
                    localStorage.setItem('username', username)
                    localStorage.setItem('password', password)
                } else {
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                }
                // 移除重定向
                const redirect = sessionStorage.getItem('redirect')
                if (redirect) {
                    sessionStorage.removeItem('redirect')
                }
                const query = getUrlParams(redirect)
                await router.replace({path: redirect || '/', query})

                ElMessage({
                    showClose: true,
                    message: '登录成功',
                    type: 'success',
                })
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
            console.error(e);
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
                token.value = ''
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

    const getToken = computed(() => {
        return token
    })

    const loadMenu = async () => {
        const menuResult = await menuApi();
        if (menuResult.code === 200) {
            menuList.value = menuResult.data;
        }
    }

    const loadInfo = async () => {
        const infoResult = await infoApi();
        if (infoResult.code === 200) {
            info.value = infoResult.data;
        }
    }

    return {
        menuList,
        info,
        permissionList,
        uploadHeaders,
        doLogin,
        doLogout,

        loadMenu,
        loadInfo,
        getToken
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

