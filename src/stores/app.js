import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAppStore = defineStore('app', () => {
    const sidebarCollapse = ref()

    const toggleSideBar = () => {
        console.log(11)
        sidebarCollapse.value = !sidebarCollapse.value;
    }

    return {
        sidebarCollapse,
        toggleSideBar
    }
}, {
    persist: true
})