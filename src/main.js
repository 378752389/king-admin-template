import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {authPlugin} from "@/directives/auth";
import './permission'

const app = createApp(App)

const pinia = createPinia()

// 添加 pinia 持久化差劲啊
pinia.use(piniaPluginPersistedstate)


app.use(pinia)
// 自定义按钮认证插件
app.use(authPlugin)
app.use(router)


// element-plus官方图标全局注册
const prefix = 'king'
for (const key in Icons) {
    const registerKey = prefix + key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
    app.component(registerKey, Icons[key])
}


app.mount('#app')
