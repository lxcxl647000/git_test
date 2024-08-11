import type { IResponseData } from "@/api/type";
/**获取属性分类 */
export interface ICategoryResponseData extends IResponseData {
    data: ICategoryData[];
}

/**属性分类数据 */
export interface ICategoryData {
    id: number;
    name: string;
    category1Id?: number;
    category2Id?: number;
}

/**属性数据 */
export interface IAttrResponseData extends IResponseData {
    data: IAttrData[];
}

export interface IAttrData {
    id?: number;
    attrName: string;
    categoryId: number | string;
    categoryLevel: number;
    attrValueList: IAttrValue[];
}

export interface IAttrValue {
    id?: number;
    valueName: string;
    attrId?: number;
    flag?: boolean;
}