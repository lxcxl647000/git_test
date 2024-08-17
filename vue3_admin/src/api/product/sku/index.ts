import request from "@/utils/request";
import type { IGetSkuResponseData, ISkuListByPageResponseData } from "./type";
import type { IResponseData } from "@/api/type";
import type { ISkuData } from "../spu/type";

enum API {
    // 获取所有的sku列表//
    SKULIST_URL = '/admin/product/list/',
    // 上架商品//
    ONSALE_URL = '/admin/product/onSale/',
    // 下架架商品//
    CANCELSALE_URL = '/admin/product/cancelSale/',
    // 删除商品//
    REMOVE_URL = '/admin/product/deleteSku/',
    // 通过skuid获取sku数据//
    GETSKUBYID_URL = '/admin/product/getSkuById/',
}

/**获取所有的sku列表 */
export const requestSkuListByPage = (page: number, limit: number) => request.get<any, ISkuListByPageResponseData>(API.SKULIST_URL + `${page}/${limit}`);

/**上架商品 */
export const requestOnSale = (skuId: number | string) => request.get<any, IResponseData>(API.ONSALE_URL + skuId);

/**下架商品 */
export const requestCancelSale = (skuId: number | string) => request.get<any, IResponseData>(API.CANCELSALE_URL + skuId);

/**删除商品 */
export const requestRemove = (skuId: number | string) => request.delete<any, IResponseData>(API.REMOVE_URL + skuId);

/**通过skuid获取sku数据 */
export const requestGetSkuByID = (skuId: number | string) => request.get<any, IGetSkuResponseData>(API.GETSKUBYID_URL + skuId);