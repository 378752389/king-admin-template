import {createProdMockServer} from "vite-plugin-mock/es/createProdMockServer";

// 加载 mock 目录下所有的以 .js 结尾的文件
const modules = import.meta.glob('../mock/**/*.js', {eager: true})

console.log("加载的内容：", modules)
const mockModules = []
Object.keys(modules).forEach(key => {
    mockModules.push(...modules[key].default)
})
export function setupProdMockServer() {
    createProdMockServer(mockModules)
}