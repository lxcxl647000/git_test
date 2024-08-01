import { requestLogin, requestLogout, requestUserInfo } from "@/api/user";
import type { ILogin, ILoginResponseData, IResponseData, IUserInfoResponseData } from "@/api/user/type";
import { defineStore } from "pinia";
import type { IUserState } from "./type/types";
import { GET_TOKEN, REMOVE_TOKE, SET_TOKEN } from "@/utils/token";
import { constantRoute } from "@/router/routes";

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