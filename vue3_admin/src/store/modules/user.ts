import { requestLogin, requestLogout, requestUserInfo } from "@/api/user";
import type { ILogin, ILoginResponseData, IUserInfoResponseData } from "@/api/user/type";
import { defineStore } from "pinia";
import type { IUserState } from "./type/types";
import { GET_TOKEN, REMOVE_TOKE, SET_TOKEN } from "@/utils/token";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
import type { IResponseData } from "@/api/type";
import { cloneDeep } from "lodash";
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";

/**过滤异步路由 */
function filterAsyncRoute(asyncRoute: RouteRecordRaw[], filters: string[]) {
    return asyncRoute.filter((item: RouteRecordRaw) => {
        if (filters.includes(item.name as string)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, filters);
            }
            return true;
        }
    });
}

let useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            // 用户唯一标识的token//
            token: GET_TOKEN(),
            routes: constantRoute,
            name: '',
            avatar: ''
        }
    },
    actions: {
        // 用户登录//
        async userLogin(data: ILogin) {
            let result: ILoginResponseData = await requestLogin(data);
            // 登录成功:200-->token//
            // 登录失败:201-->登录失败错误信息//
            if (result.code === 200) {
                // 仓库存储token//
                this.token = result.data || '';
                // 本地持久化存储一份//
                SET_TOKEN(this.token || '');
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },

        // 获取用户信息//
        async userInfo() {
            let result: IUserInfoResponseData = await requestUserInfo();
            if (result.code === 200) {
                this.name = result.data.name;
                this.avatar = result.data.avatar;
                // 过滤异步路由//
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
                this.routes = [...constantRoute, ...userAsyncRoute, anyRoute];
                [...userAsyncRoute, anyRoute].forEach((item: RouteRecordRaw) => {
                    router.addRoute(item);
                });

                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },

        // 用户退出登录//
        async userLogout() {
            // 请求服务器退出登录 告知服务器本次token失效 //
            let result: IResponseData = await requestLogout();
            if (result.code === 200) {
                this.token = '';
                this.name = '';
                this.avatar = '';
                REMOVE_TOKE();
                // 清掉路由，再把常量路由加进去，以免换了账号引起菜单权限问题//
                router.clearRoutes();
                constantRoute.forEach((item: any) => {
                    router.addRoute(item);
                });
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        }
    },
    getters: {}
});

export default useUserStore;