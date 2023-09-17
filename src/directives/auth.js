import {useUserInfoStore} from "@/stores/userInfo";
export const authPlugin = {
    install(app) {
        app.directive('auth', {
            mounted(el, binding) {
                // el: 指令绑定的元素
                // binding: binding.value 指令等于号后面绑定的值
                const userInfoStore = useUserInfoStore()
                const requiredPermission = binding.value;
                if (userInfoStore.permissionList && userInfoStore.permissionList.indexOf(requiredPermission) === -1) {
                    // 没有权限，移除元素
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        })
    }
}