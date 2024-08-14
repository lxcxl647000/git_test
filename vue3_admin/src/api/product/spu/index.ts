import request from "@/utils/request";
import type { ISpuAllSaleAttrResponseData, ISpuImgResponseData, ISpuRecord, ISpuResponseData, ISpuSaleAttrResponseData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取已有的spu记录//
    SPURECORDS_URL = '/admin/product/',
    // 获取spu照片墙//
    SPUIMGLIST_URL = '/admin/product/spuImageList/',
    // 获取销售属性列表//
    SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
    // 获取全部销售属性//
    SPUTALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    // 添加spu//
    SPUADD_URL = '/admin/product/saveSpuInfo',
    // 修改spu//
    SPUEDIT_URL = '/admin/product/updateSpuInfo',
}

/**获取已有的spu记录 */
export const requestSpuRecords = (page: number, limit: number, category3Id: number | string) => request.get<any, ISpuResponseData>(API.SPURECORDS_URL + `${page}/${limit}?category3Id=${category3Id}`);

/**获取spu照片墙 */
export const requestSpuImgList = (spuId: number) => request.get<any, ISpuImgResponseData>(API.SPUIMGLIST_URL + spuId);

/**获取销售属性列表 */
export const requestSpuSaleAttrList = (spuId: number) => request.get<any, ISpuSaleAttrResponseData>(API.SPUSALEATTRLIST_URL + spuId);

/**获取全部销售属性 */
export const requestSpuAllSaleAttr = () => request.get<any, ISpuAllSaleAttrResponseData>(API.SPUTALLSALEATTR_URL);

/**添加spu */
export const requestSpuAdd = (data: ISpuRecord) => request.post<any, IResponseData>(API.SPUADD_URL, data);

/**修改spu */
export const requestSpuEdit = (data: ISpuRecord) => request.post<any, IResponseData>(API.SPUEDIT_URL, data);