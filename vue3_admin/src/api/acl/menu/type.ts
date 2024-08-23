import type { IResponseData } from "@/api/type";

export interface IGetPermissionResponseData extends IResponseData {
    data: IPermissionData[];
}

export interface IPermissionData {
    id?: number;
    createTime: string;
    updateTime: string;
    pid: number;
    name: string;
    code: null;
    toCode: null;
    type: number;
    status: null;
    level: number;
    children: IPermissionData[];
    select: boolean;
}

export interface IAssignPermissionRequestData {
    permissionIdList: number[];
    roleId: number;
}

export interface IGetAllPermissionResponseData extends IResponseData {
    data: IPermissionData[];
}