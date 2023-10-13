import {useUserInfoStore} from "@/stores/userInfo";
export const authPlugin = {
    install(app) {
        app.directive('auth', {
            mounted(el, binding) {
                // el: 指令绑定的元素
                // binding: binding.value 指令等于号后面绑定的值
                const userInfoStore = useUserInfoStore()
                const requiredPermission = binding.value;
                // 如果绑定的值为数组，要求数组内所有权限都必须拥有才能渲染
                if (Array.isArray(requiredPermission)) {
                    for (let i = 0; i < requiredPermission.length; i++) {
                        if (userInfoStore.permissionList.indexOf(requiredPermission[i]) === -1) {
                            // 没有权限，移除元素
                            el.parentNode && el.parentNode.removeChild(el)
                            break
                        }
                    }
                } else {
                    if (userInfoStore.permissionList.indexOf(requiredPermission) === -1) {
                        // 没有权限，移除元素
                        el.parentNode && el.parentNode.removeChild(el)
                    }
                }

            }
        })
    }
}