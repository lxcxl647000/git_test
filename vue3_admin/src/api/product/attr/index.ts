import request from "@/utils/request";
import type { IAttrData, IAttrResponseData, ICategoryResponseData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取一级分类接口//
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类接口//
    C2_URL = '/admin/product/getCategory2/',
    // 获取三级分类接口//
    C3_URL = '/admin/product/getCategory3/',
    // 获取属性接口//
    ATTR_URL = '/admin/product/attrInfoList/',
    // 保存属性值接口(新增和修改)//
    SAVEATTR_URL = '/admin/product/saveAttrInfo',
    // 删除属性接口//
    DELETEATTR_URL = '/admin/product/deleteAttr/',
}

/**获取一级分类 */
export const requestC1 = () => request.get<any, ICategoryResponseData>(API.C1_URL);

/**获取二级分类 */
export const requestC2 = (category1_id: number | string) => request.get<any, ICategoryResponseData>(API.C2_URL + category1_id);

/**获取三级分类 */
export const requestC3 = (category2_id: number | string) => request.get<any, ICategoryResponseData>(API.C3_URL + category2_id);

/**获取属性 */
export const requestAttr = (c1Id: number | string, c2Id: number | string, c3Id: number | string) => request.get<any, IAttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`);

/**保存属性值接口(新增和修改) */
export const requestSaveAttr = (data: IAttrData) => request.post<any, IResponseData>(API.SAVEATTR_URL, data);

/**删除属性接口 */
export const requestDelAttr = (attrID: number) => request.delete<any, IResponseData>(API.DELETEATTR_URL + attrID);