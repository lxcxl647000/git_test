import request from "@/utils/request";
import type { IAssignRoleRequestData, IGetRolesResponseData, IGetUsersResponseData, IUser } from "./type";
import type { IResponseData } from "@/api/type";

enum API {
    // 获取用户管理列表//
    GETUSERLIST_URL = '/admin/acl/user/',
    // 新增用户//
    ADDUSER_URL = '/admin/acl/user/save',
    // 修改用户//
    EDITUSER_URL = '/admin/acl/user/update',
    // 搜索用户//
    SEARCHUSER_URL = '/admin/acl/role/get/',
    // 删除用户//
    REMOVEUSER_URL = '/admin/acl/user/remove/',
    // 批量删除用户//
    BATCHREMOVEUSER_URL = '/admin/acl/user/batchRemove',
    // 获取用户角色数据//
    GETROLES = '/admin/acl/user/toAssign/',
    // 分配用户角色//
    ASSIGNROLES = '/admin/acl/user/doAssignRole',
}

/**获取用户管理列表 */
export const requestUserList = (page: number, limit: number, username: string) => request.get<any, IGetUsersResponseData>(API.GETUSERLIST_URL + `${page}/${limit}/?username=${username}`);

/**新增用户 */
export const requestAddUser = (data: IUser) => request.post<any, IResponseData>(API.ADDUSER_URL, data);

/**修改用户 */
export const requestEditUser = (data: IUser) => request.put<any, IResponseData>(API.EDITUSER_URL, data);

/**搜索用户 */
export const requestSearchUser = (id: number) => request.get<any, any>(API.SEARCHUSER_URL + id);

/**删除用户 */
export const requestRemoveUser = (id: number) => request.delete<any, IResponseData>(API.REMOVEUSER_URL + id);

/**批量删除用户 */
export const requestBatchRemoveUser = (data: number[]) => request.delete<any, IResponseData>(API.BATCHREMOVEUSER_URL, { data });

/**获取用户角色数据 */
export const requestGetRoles = (adminId: number) => request.get<any, IGetRolesResponseData>(API.GETROLES + adminId);

/**分配用户角色 */
export const requestAssignRoles = (data: IAssignRoleRequestData) => request.post<any, IResponseData>(API.ASSIGNROLES, data);

