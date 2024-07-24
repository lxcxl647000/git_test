import request from "@/utils/request";
import type { ILogin, ILoginResponse, IUserInfoResponse } from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

/**请求登录接口 */
export const requestLogin = (data: ILogin, success?: Function, fail?: Function) => {
    request.post<any, ILoginResponse>(API.LOGIN_URL, data).then(
        response => {
            if (response.code === 200) {
                success && success(response.data);
            }
            else {
                fail && fail(response.data);
            }
        },
        error => {
            fail && fail(error.data.data);
        }
    );
};

/**请求用户信息接口 */
export const requestUserInfo = (success?: Function, fail?: Function) => {
    request.get<any, IUserInfoResponse>(API.USERINFO_URL).then(
        response => {
            if (response.code === 200) {
                success && success(response.data);
            }
            else {
                fail && fail(response.data);
            }
        },
        error => {
            fail && fail(error.data.data);
        }
    );
};

