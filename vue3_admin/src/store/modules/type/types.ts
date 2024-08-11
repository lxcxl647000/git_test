import type { IAttrData, ICategoryData } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router";

// 定义小仓库数据state的类型//
export interface IUserState {
    token: string | null,
    routes: RouteRecordRaw[],
    name: string,
    avatar: string
}

export interface ICategoryState {
    category1_arr: ICategoryData[],
    category2_arr: ICategoryData[],
    category3_arr: ICategoryData[],
    c1_id: number | string,
    c2_id: number | string,
    c3_id: number | string,
}