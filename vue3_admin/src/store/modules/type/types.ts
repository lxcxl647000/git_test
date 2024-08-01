import type { RouteRecordRaw } from "vue-router";

// 定义小仓库数据state的类型//
export interface IUserState {
    token: string | null,
    routes: RouteRecordRaw[],
    name: string,
    avatar: string
}