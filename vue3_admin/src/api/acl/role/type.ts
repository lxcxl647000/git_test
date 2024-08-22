import type { IResponseData } from "@/api/type";

export interface IGetRoleListResponseData extends IResponseData {
    data: IGetRoles;
}

export interface IGetRoles {
    records: IRole[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
}

export interface IRole {
    id?: number;
    createTime?: string;
    updateTime?: string;
    roleName: string;
    remark?: null | string;
}