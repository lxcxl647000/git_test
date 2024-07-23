import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locales.mjs'

const app = createApp(App);
//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn
});
app.mount('#app');
