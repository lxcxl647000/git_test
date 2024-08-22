import request from "@/utils/request";
import type { IAssignPermissionRequestData, IGetPermissionResponseData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取角色的权限//
    GETROLEPERMISSIONLIST_URL = '/admin/acl/permission/toAssign/',
    // 分配权限//
    ASSIGNPERMISSION_URL = '/admin/acl/permission/doAssignAcl',
}

/**获取所有权限 */
export const requestGetPermission = (roleId: number) => request.get<any, IGetPermissionResponseData>(API.GETROLEPERMISSIONLIST_URL + roleId);

/**分配权限 */
export const requestAssignPermission = (data: IAssignPermissionRequestData) => request.post<any, IResponseData>(API.ASSIGNPERMISSION_URL, data);