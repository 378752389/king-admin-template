import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {loginByForm} from "@/api/system/login";
import {ElMessage} from "element-plus";

export const useUserInfoStore = defineStore("userInfo", () => {
    // {
    //     uid: undefined,
    //         username: '',
    //     resourceList: []
    // }
    const userInfo = ref({})

    const loadUserInfo = async ({username, password}) => {
        // 分页获取用户列表数据

        try {
            const result = await loginByForm({
                username,
                password
            })
            if (result && result.code !== 200) {
                console.log(result)
                ElMessage({
                    showClose: true,
                    message: result.message || '用户名或密码错误1',
                    type: 'error',
                })
                return
            }
            if (result && result.code === 200) {
                userInfo.value = result.data;
            }
        } catch (e) {
            console.log(e);
        }
    }

    // 获取按钮权限列表
    const permissionList = computed(() => {
        return userInfo.value.resourceList && userInfo.value.resourceList.filter(x => x.resourceType === 1).map(x => x.permission);
    })

    // 获取菜单权限列表
    const menuList = computed(() => {
        return userInfo.value.resourceList && userInfo.value.resourceList.filter(x => x.resourceType === 0).map(x => x.permission)
    })


    // 清除用户信息
    const clearUserInfo = function () {
        userInfo.value = {};
    }

    return {
        userInfo,
        permissionList,
        menuList,
        clearUserInfo,
        loadUserInfo
    }
}, {persist: {
        storage: sessionStorage
    }})

