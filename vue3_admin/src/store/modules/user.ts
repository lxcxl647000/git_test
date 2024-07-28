import { requestLogin } from "@/api/user";
import type { ILogin, ILoginResponse } from "@/api/user/type";
import { defineStore } from "pinia";
import type { IUserState } from "./type/types";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
import { constantRoute } from "@/router/routes";

let useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            // 用户唯一标识的token//
            token: GET_TOKEN(),
            routes: constantRoute,
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
        }
    },
    getters: {}
});

export default useUserStore;