import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAppStore = defineStore('app', () => {
    const sidebarCollapse = ref(false)

    const toggleSideBar = () => {
        sidebarCollapse.value = !sidebarCollapse.value;
    }

    return {
        sidebarCollapse,
        toggleSideBar
    }
}, {
    persist: true
})