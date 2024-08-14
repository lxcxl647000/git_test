import request from "@/utils/request";
import type { ITrademarkListResponse, ITrademarkRecord, ITrademarkResponseData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取已有品牌接口//
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    // 添加品牌接口//
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    // 编辑品牌接口//
    EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
    // 删除品牌接口//
    DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
    // 获取所有品牌列表//
    GETTRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
}

/**获取已有品牌的接口
 * page：获取第几页
 * limit：该页获取几个数据
 */
export const requestHadTrademark = (page: number, limit: number) => request.get<any, ITrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);

/**
 * 添加品牌的接口
 * @returns 
 */
export const requestAddTrademark = (data: ITrademarkRecord) => request.post<any, IResponseData>(API.ADDTRADEMARK_URL, data);

/**
 * 编辑品牌的接口
 * @returns 
 */
export const requestEditTrademark = (data: ITrademarkRecord) => request.put<any, IResponseData>(API.EDITTRADEMARK_URL, data);

/**
 * 删除品牌接口
 */
export const requestDeleteTrademark = (id: number) => request.delete<any, IResponseData>(API.DELETETRADEMARK_URL + id);

/**
 * 获取所有品牌列表
 */
export const requestTrademarkList = () => request.get<any, ITrademarkListResponse>(API.GETTRADEMARKLIST_URL);