import type { IResponseData } from "@/api/type";

export interface ISpuResponseData extends IResponseData {
    data: ISpuData;
}

export interface ISpuData {
    records: ISpuRecord[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

export interface ISpuRecord {
    id?: number;
    // 商品名称//
    spuName: string;
    // 商品描述(后台简述）//
    description: string;
    // 三级分类id//
    category3Id: number | string;
    // 品牌id//
    tmId: number | string;
    // 销售属性//
    spuSaleAttrList: null | ISpuSaleAttr[];
    // 图片//
    spuImageList: null | ISpuImg[];
}

export interface ISpuImgResponseData extends IResponseData {
    data: ISpuImg[];
}

export interface ISpuImg {
    id?: number;
    spuId?: number;
    imgName?: string;
    imgUrl?: string;
    name?: string;
    url?: string;
}

export interface ISpuSaleAttrResponseData extends IResponseData {
    data: ISpuSaleAttr[];
}

export interface ISpuSaleAttr {
    id?: number;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: ISpuSaleAttrValue[];
    inputVisible?: boolean
}

export interface ISpuSaleAttrValue {
    id?: number;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName: string;
    isChecked?: null;
}

export interface ISpuAllSaleAttrResponseData extends IResponseData {
    data: ISpuAllSaleAttr[];
}

export interface ISpuAllSaleAttr {
    id: number;
    name: string;
}

export interface ISkuData {
    category3Id: number | string;
    spuId: number;
    tmId: number | string;
    skuName: string;
    price: number | string;
    weight: string;
    skuDesc: string;
    skuAttrValueList: ISkuAttrValue[];
    skuSaleAttrValueList: ISkuSaleAttrValue[];
    skuDefaultImg: string;
    isSale?: number;
    id?: number;
    skuImageList?: ISpuImg[];
}

export interface ISkuSaleAttrValue {
    // 销售属性id//
    saleAttrId: number;
    // 销售属性值id//
    saleAttrValueId: number;
    // 销售属性值名称//
    saleAttrValueName?: string;
}

export interface ISkuAttrValue {
    // 平台属性id//
    attrId: number;
    // 平台属性值id//
    valueId: number;
    // 平台属性值名称//
    valueName?: string
}

/**获取sku列表的返回数据 */
export interface ISkuListResponsData extends IResponseData {
    data: ISkuData[];
}