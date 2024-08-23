import request from "@/utils/request";
import type { IAssignPermissionRequestData, IGetAllPermissionResponseData, IGetPermissionResponseData, IPermissionData } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取角色的权限//
    GETROLEPERMISSIONLIST_URL = '/admin/acl/permission/toAssign/',
    // 分配权限//
    ASSIGNPERMISSION_URL = '/admin/acl/permission/doAssignAcl',
    // 获取所有菜单权限//
    GETALLPERMISSION_URL = '/admin/acl/permission',
    // 添加菜单//
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    // 修改菜单//
    EDITPERMISSION_URL = '/admin/acl/permission/update',
    // 删除菜单//
    REMOVEPERMISSION_URL = '/admin/acl/permission/remove/',
}

/**获取所有权限 */
export const requestGetPermission = (roleId: number) => request.get<any, IGetPermissionResponseData>(API.GETROLEPERMISSIONLIST_URL + roleId);

/**分配权限 */
export const requestAssignPermission = (data: IAssignPermissionRequestData) => request.post<any, IResponseData>(API.ASSIGNPERMISSION_URL, data);

/**获取所有菜单权限 */
export const requestAllAssignPermission = () => request.get<any, IGetAllPermissionResponseData>(API.GETALLPERMISSION_URL);

/**添加菜单 */
export const requestAddPermission = (data: IPermissionData) => request.post<any, IResponseData>(API.ADDPERMISSION_URL, data);

/**修改菜单 */
export const requestEditPermission = (data: IPermissionData) => request.post<any, IResponseData>(API.EDITPERMISSION_URL, data);

/**修改菜单 */
export const requestRemovePermission = (id: number) => request.delete<any, IResponseData>(API.REMOVEPERMISSION_URL + id);