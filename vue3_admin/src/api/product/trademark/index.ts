import request from "@/utils/request";
import type { ITrademarkRecord, ITrademarkResponseData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取已有品牌接口//
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    // 添加品牌接口//
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    // 编辑品牌接口//
    EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
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