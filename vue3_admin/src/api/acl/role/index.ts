import request from "@/utils/request";
import type { IGetRoleListResponseData, IRole } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取角色列表//
    GETROLELIST_URL = '/admin/acl/role/',
    // 删除角色//
    REMOVEROLE_URL = '/admin/acl/role/remove/',
    // 添加角色//
    ADDROLE_URL = '/admin/acl/role/save',
    // 修改角色//
    EDITROLE_URL = '/admin/acl/role/udpate',
}

/**获取角色列表 */
export const requestGetRoleList = (page: number, limit: number, roleName: string) => request.get<any, IGetRoleListResponseData>(API.GETROLELIST_URL + `${page}/${limit}/?roleName=${roleName}`);

/**删除角色 */
export const requestRemoveRole = (id: number) => request.delete<any, IResponseData>(API.REMOVEROLE_URL + id);

/**添加角色 */
export const requestAddRole = (data: IRole) => request.post<any, IResponseData>(API.ADDROLE_URL, data);

/**修改角色 */
export const requestEditRole = (data: IRole) => request.put<any, IResponseData>(API.EDITROLE_URL, data);