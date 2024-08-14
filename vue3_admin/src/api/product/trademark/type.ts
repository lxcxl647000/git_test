import type { IResponseData } from "@/api/type";

/**获取已有品牌返回数据 */
export interface ITrademarkResponseData extends IResponseData {
    data: ITrademarkData;
}

export interface ITrademarkData {
    records: ITrademarkRecord[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

/**品牌数据 */
export interface ITrademarkRecord {
    id?: number;
    tmName: string;
    logoUrl: string;
}

/**获取品牌列表返回数据 */
export interface ITrademarkListResponse extends IResponseData {
    data: ITrademarkRecord[];
}