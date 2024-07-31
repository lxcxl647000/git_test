// 路由鉴权 项目中路由能不能被访问的权限的设置//
import nProgress from "nprogress";
import router from "./router";
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user";
import pinia from "./store";
import setting from "./setting";

// 取消进度条转圈的效果//
nProgress.configure({ showSpinner: false });

// 全部路由组件：登录、404、任意路由、首页、数据大屏、权限管理（3个子路由）、商品管理（4个子路由）//
// 用户未登录 可以访问login，其余路由均不能访问(指向login)//
// 用户登录成功 不能访问login（指向首页）其他路由均可访问//

let userStore = useUserStore(pinia);

// 全局守卫 项目中任意路由切换都会触发的钩子//
// 全局前置守卫//
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    // to 将要访问的路由//
    // from 从哪个路由而来//
    // next 路由放行函数//

    document.title = `${setting.title} - ${to.meta.title}`;
    nProgress.start();
    // 获取token判断是否登录//
    let token = userStore.token;
    // 获取用户名字判断是否获取用户信息//
    let username = userStore.username;

    if (token) {// 已登录//
        if (to.path === '/login') {
            next({ path: '/' });
        }
        else {
            if (username) {// 有用户信息//
                next();
            }
            else {// 没有用户信息去获取一下//
                try {
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    // token过期或者本地token数据被修改导致获取不到用户信息//
                    userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } });
                }
            }
        }
    }
    else {
        if (to.path === '/login') {
            next();
        }
        else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }
});
// 全局后置守卫//
router.afterEach((to, from) => {
    // to and from are both route objects.
    nProgress.done();
});