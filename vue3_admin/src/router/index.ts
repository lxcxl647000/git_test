// 通过vue-router插件实现路由配置//
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { constantRoute } from "./routes";
// 创建路由器//
let router = createRouter({
    // 路由模式//
    history: createWebHistory(),
    routes: constantRoute,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
});

export default router;