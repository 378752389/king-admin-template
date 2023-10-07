import {defineStore} from 'pinia';
import {ref} from 'vue';


export const useAppStore = defineStore('dynamicRoute', () => {
    const routes = ref([])
    const loadRoutes = () => {

    }

    return {
        routes,
        loadRoutes
    }
})