import { requestLogin, requestUserInfo } from "@/api/user";
import type { ILogin, ILoginResponse, IUserInfoResponse } from "@/api/user/type";
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
            username: '',
            avatar: ''
        }
    },
    actions: {
        // 用户登录//
        async userLogin(data: ILogin) {
            let result: ILoginResponse = await requestLogin(data);
            // 登录成功:200-->token//
            // 登录失败:201-->登录失败错误信息//
            if (result.code === 200) {
                // 仓库存储token//
                this.token = result.data.token || '';
                // 本地持久化存储一份//
                SET_TOKEN(result.data.token || '');
                return 'ok';
            }
            else {
                return Promise.reject(result.data);
            }
        },

        // 获取用户信息//
        async userInfo() {
            let result: IUserInfoResponse = await requestUserInfo();
            if (result.code === 200) {
                this.username = result.data.checkUser.username;
                this.avatar = result.data.checkUser.avatar;
                return 'ok';
            }
            else {
                return Promise.reject(result.data.message);
            }
        },

        // 用户退出登录//
        userLogout() {
            // 请求服务器退出登录 告知服务器本次token失效 //
            // 目前mock接口无退出登录接口//
            this.token = '';
            this.username = '';
            this.avatar = '';
            REMOVE_TOKE();
        }
    },
    getters: {}
});

export default useUserStore;