import request from "@/utils/request";
import type { ILogin, ILoginResponse, IUserInfoResponse } from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

/**请求登录接口 */
export const requestLogin = (data: ILogin) => {
    return request.post<any, ILoginResponse>(API.LOGIN_URL, data);
};

/**请求用户信息接口 */
export const requestUserInfo = () => {
    return request.get<any, IUserInfoResponse>(API.USERINFO_URL);
};

