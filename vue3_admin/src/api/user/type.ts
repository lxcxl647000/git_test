/**登录请求参数数据 */
export interface ILogin {
    username: string,
    password: string,
}

export interface ILoginResponseData {
    token: string,
}

/**登录返回数据 */
export interface ILoginResponse {
    code: number,
    data: ILoginResponseData
}

/**用户数据类型 */
export interface IUserInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}

/**获取用户返回数据 */
export interface IUserInfoResponse {
    code: number,
    data: IUserInfo
}