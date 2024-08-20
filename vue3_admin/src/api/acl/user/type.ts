import type { IResponseData } from "../../type";

export interface IGetUsersResponseData extends IResponseData {
    data: IUserData;
}

export interface IUserData {
    records: IUser[];
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

export interface IUser {
    id?: number;
    createTime: string;
    updateTime: string;
    username: string;
    password: string;
    name: string;
    phone: null;
    roleName: string;
}

export interface IGetRolesResponseData extends IResponseData {
    data: IRolesData;
}

export interface IRolesData {
    assignRoles: IAssignRole[];
    allRolesList: IAssignRole[];
}

export interface IAssignRole {
    id: number;
    roleName: string;
    remark: null | string;
}

export interface IAssignRoleRequestData {
    roleIdList: number[];
    userId: number;
}