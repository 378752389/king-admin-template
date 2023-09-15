import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import './permission'

const app = createApp(App)

app.use(createPinia())
app.use(router)


// element-plus官方图标全局注册
const prefix = 'king'
for (const key in Icons) {
    const registerKey = prefix + key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
    app.component(registerKey, Icons[key])
}


app.mount('#app')
