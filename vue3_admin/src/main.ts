import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locales.mjs'
import 'virtual:svg-icons-register'
import globalComponet from './index'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
import './permission'

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn
});
//安装自定义插件实现全局组件的引入
app.use(globalComponet);
// 注册路由//
app.use(router);
// 安装大仓库//
app.use(pinia);
app.mount('#app');
