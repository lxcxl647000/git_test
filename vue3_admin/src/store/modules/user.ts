import { requestLogin } from "@/api/user";
import type { ILogin, ILoginResponse } from "@/api/user/type";
import { defineStore } from "pinia";

let useUserStore = defineStore('user', {
    state: () => {
        return {
            // 用户唯一标识的token//
            token: localStorage.getItem('TOKEN'),
        }
    },
    actions: {
        // 用户登录//
        async userLogin(data: ILogin) {
            let result: any = await requestLogin(data);
            // 登录成功:200-->token//
            // 登录失败:201-->登录失败错误信息//
            if (result.code === 200) {
                // 仓库存储token//
                this.token = result.data.token;
                // 本地持久化存储一份//
                localStorage.setItem('TOKEN', result.data.token);
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