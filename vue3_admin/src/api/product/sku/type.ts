import type { IResponseData } from "@/api/type";
import type { ISkuData } from "../spu/type";

export interface ISkuListByPageResponseData extends IResponseData {
    data: ISkuListData;
}

export interface ISkuListData {
    records: ISkuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

export interface IGetSkuResponseData extends IResponseData {
    data: ISkuData;
}