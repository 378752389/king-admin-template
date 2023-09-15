import * as Icons from '@element-plus/icons-vue'

for (const key in Icons) {
    console.log(key, Icons[key])
    // app.component(transElIconName(key), Icons[key])
}