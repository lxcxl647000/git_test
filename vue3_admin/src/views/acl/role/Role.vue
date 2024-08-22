<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称" v-model="searchRole"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="onSearchRole"
                    :disabled="searchRole ? false : true">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="editRole" icon="Plus">添加角色</el-button>
        <el-table border style="margin: 10px 0px;" :data="roles">
            <el-table-column type="index" label="#" width="100px" align="center"></el-table-column>
            <el-table-column label="id" width="200px" prop="id" align="center"></el-table-column>
            <el-table-column label="角色名称" width="200px" prop="roleName" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="创建时间" width="200px" prop="createTime"
                align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="更新时间" width="200px" prop="updateTime"
                align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" @click="assignPermission(row)" icon="User">分配权限</el-button>
                    <el-button type="primary" size="small" @click="editRole(row)" icon="Edit">编辑</el-button>
                    <el-popconfirm :title="`确定删除${row.roleName}吗?`" @confirm="onRemoveRole(row)" width="200px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" :page-sizes="[10, 20, 30]" v-model:page-size="pageSize"
            layout="prev, pager, next, jumper,->,sizes,total" :total="totalNum" background @change="getRoleList">
        </el-pagination>
    </el-card>
    <!-- 添加、修改角色dialog -->
    <el-dialog v-model="dialogFormVisible" :title="role.id ? `修改角色` : `添加角色`" width="500" @close="clearRole">
        <el-form :model="role" ref="roleNameForm" :rules="rules">
            <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请输入角色名称" v-model="role.roleName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button size="default" @click="closeEditRole">取消</el-button>
            <el-button type="primary" size="default" @click="comfirmEditRole">确定</el-button>
        </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-drawer v-model="drawer" @close="clearRolePermissionList">
        <template #header>
            <h4>分配权限</h4>
        </template>
        <template #default>
            <el-tree ref="tree" style="max-width: 600px" :data="permissionList" show-checkbox node-key="id"
                :props="defaultProps" :default-checked-keys="premissionCheckedList" default-expand-all />
        </template>
        <template #footer>
            <el-button size="default" @click="closeAssignPermission">取消</el-button>
            <el-button type="primary" size="default" @click="comfirmAssignPermission">确定</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
    import { requestAssignPermission, requestGetPermission } from '@/api/acl/menu';
    import type { IAssignPermissionRequestData, IPermissionData } from '@/api/acl/menu/type';
    import { requestAddRole, requestEditRole, requestGetRoleList, requestRemoveRole } from '@/api/acl/role';
    import type { IRole } from '@/api/acl/role/type';
    import useLayoutStore from '@/store/modules/layout';
    import { ElMessage } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';

    let layoutStore = useLayoutStore();

    let currentPage = ref(1);
    let totalNum = ref(0);
    let pageSize = ref(10);

    let roles = ref<IRole[]>([]);
    let searchRole = ref<string>('');

    let role = reactive<IRole>({
        roleName: '',
    });
    let dialogFormVisible = ref(false);
    let rules = reactive({
        roleName: [
            { required: true, validator: validateRoleName, trigger: 'blur' }
        ],
    });
    let roleNameForm = ref();

    let drawer = ref(false);
    let permissionList = ref<IPermissionData[]>([]);
    const defaultProps = {
        children: 'children',
        label: 'name',
    };
    let tree = ref();
    let premissionCheckedList: number[] = [];

    onMounted(() => {
        getRoleList();
    });

    async function getRoleList(page?: number) {
        if (page) {
            currentPage.value = page;
        }
        let result = await requestGetRoleList(currentPage.value, pageSize.value, searchRole.value);
        if (result.code === 200) {
            roles.value = result.data.records;
            totalNum.value = result.data.total;
        }
    }

    async function onRemoveRole(row: IRole) {
        let result = await requestRemoveRole(row.id!);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            getRoleList();
        }
        else {
            ElMessage.error('删除失败');
        }
    }

    function editRole(row?: IRole) {
        if (row) {
            Object.assign(role, row);
        }
        dialogFormVisible.value = true;
    }

    function closeEditRole() {
        if (dialogFormVisible.value) {
            dialogFormVisible.value = false;
            roleNameForm.value.resetFields();
            clearRole();
        }
    }

    async function comfirmEditRole() {
        try {
            await roleNameForm.value.validate();
            let isAdd = role.id ? false : true;
            let result = isAdd ? await requestAddRole(role) : await requestEditRole(role);
            if (result.code === 200) {
                ElMessage.success(isAdd ? '添加成功' : '修改成功');
                getRoleList(isAdd ? 1 : currentPage.value);
            }
            else {
                ElMessage.error(isAdd ? '添加失败' : '修改失败');
            }
            closeEditRole();
        } catch (error) {

        }
    }

    function clearRole() {
        delete role.id;
        Object.assign(role, {
            roleName: ''
        });
    }

    function validateRoleName(rule: any, value: any, callback: any) {
        let val = value.trim();
        if (val < 1) {
            callback(new Error('职位名称不能为空'));
        }
        else {
            callback();
        }
    }

    function onSearchRole() {
        getRoleList();
    }

    function reset() {
        searchRole.value = '';
        layoutStore.refresh = !layoutStore.refresh;
    }

    async function assignPermission(row: IRole) {
        drawer.value = true;
        Object.assign(role, row);
        let result = await requestGetPermission(row.id!);
        if (result.code === 200) {
            permissionList.value = result.data;
            for (let p of permissionList.value) {
                premissionCheckedList = premissionCheckedList.concat(getPermissionChecked(p));
            }
        }
    }

    function closeAssignPermission() {
        drawer.value = false;
        clearRolePermissionList();
    }

    function clearRolePermissionList() {
        premissionCheckedList = [];
        permissionList.value = [];
        clearRole();
    }

    function getPermissionChecked(data: IPermissionData) {
        let selected: number[] = [];
        if (data.select && !data.children.length) {
            selected.push(data.id);
        }
        for (let child of data.children) {
            selected = selected.concat(getPermissionChecked(child));
        }
        return selected;
    }

    async function comfirmAssignPermission() {
        let data: IAssignPermissionRequestData = {
            permissionIdList: tree.value.getCheckedKeys().concat(tree.value.getHalfCheckedKeys()),
            roleId: role.id!
        };
        let result = await requestAssignPermission(data);
        if (result.code === 200) {
            ElMessage.success('分配成功');
            closeAssignPermission();
            window.location.reload();
        }
        else {
            ElMessage.error('分配失败');
        }
    }

</script>

<style scoped lang="scss">
    .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>