import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {authPlugin} from '@/directives/auth'
import'element-plus/dist/index.css'
import './permission'
import './styles/main.less'

// vue3 Added non-passive event listener to a scroll-blocking 'wheel' event. 处理 滚动条 警告问题
import 'default-passive-events'

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
