<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="searchUser"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="onSearch"
                    :disabled="searchUser ? false : true">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="onEditUser" v-btnPermission="`btn.User.add`">添加</el-button>
        <el-button type="danger" size="default" @click="onBatchRemoveUser" :disabled="selectUsers.length ? false : true"
            v-btnPermission="`btn.User.remove`">批量删除</el-button>
        <el-table border style="margin: 10px 0px;" :data="userList" @selection-change="onSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="#" width="80px" align="center"></el-table-column>
            <el-table-column label="id" width="150px" prop="id"></el-table-column>
            <el-table-column label="用户名字" width="150px" prop="name"></el-table-column>
            <el-table-column label="用户名称" width="150px" prop="username"></el-table-column>
            <el-table-column show-overflow-tooltip label="用户角色" width="150px" prop="roleName"></el-table-column>
            <el-table-column show-overflow-tooltip label="创建时间" width="150px" prop="createTime"></el-table-column>
            <el-table-column show-overflow-tooltip label="更新时间" width="150px" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" @click="assignRole(row)" icon="User"
                        v-btnPermission="`btn.User.assgin`">分配角色</el-button>
                    <el-button type="primary" size="small" @click="onEditUser(row)" icon="Edit"
                        v-btnPermission="`btn.User.update`">编辑</el-button>
                    <el-popconfirm :title="`确定删除${row.username}吗?`" @confirm="onRemoveUser(row)" width="200px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete"
                                v-btnPermission="`btn.User.remove`">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" :page-sizes="[5, 7, 9]" v-model:page-size="pageSize"
            layout="prev, pager, next, jumper,->,sizes,total" :total="totalNum" background @change="getUserList">
        </el-pagination>
    </el-card>
    <!-- 新增或修改用户 -->
    <el-drawer v-model="drawer" direction="rtl" @close="closeUserDrawer">
        <template #header>
            <h4>{{ !user.id ? '添加用户' : '修改用户' }}</h4>
        </template>
        <template #default>
            <el-form ref="userForm" :model="user" :rules="rules">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请填写用户名字" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请填写用户昵称" v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-show="!user.id">
                    <el-input placeholder="请填写用户密码" v-model="user.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button size="default" @click="closeUserDrawer">取消</el-button>
            <el-button type="primary" size="default" @click="comfirmEditUser">确定</el-button>
        </template>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawerRole" direction="rtl" @close="closeRoleDrawer">
        <template #header>
            <h4>分配角色用户</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input :disabled="true" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <div>
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="checkeRoles" @change="handleCheckedRolesChange">
                            <el-checkbox v-for="(item, index) in allRoles" :key="index" :label="item.roleName"
                                :value="item">
                                {{ item.roleName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button size="default" @click="closeRoleDrawer">取消</el-button>
            <el-button type="primary" size="default" @click="comfirmAssignRole">确定</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
    import type { IRole } from '@/api/acl/role/type';
    import { requestAddUser, requestAssignRoles, requestBatchRemoveUser, requestEditUser, requestGetRoles, requestRemoveUser, requestUserList } from '@/api/acl/user';
    import type { IAssignRoleRequestData, IUser } from '@/api/acl/user/type';
    import useUser from '@/hooks/useUser';
    import useLayoutStore from '@/store/modules/layout';
    import useUserStore from '@/store/modules/user';
    import { ElMessage } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';

    let userStore = useUserStore();
    let layoutStore = useLayoutStore();

    let currentPage = ref(1);
    let totalNum = ref(0);
    let pageSize = ref(5);

    let userList = ref<IUser[]>([]);

    let drawer = ref(false);
    // 被添加或修改的用户,被分配角色的用户,都可以用该数据来存,记得清理//
    let user = reactive<IUser>({
        createTime: '',
        updateTime: '',
        username: '',
        password: '',
        name: '',
        phone: null,
        roleName: ''
    });
    let userIsSelf = false;
    let userForm = ref();
    let { validateUserName, validatePassword, validateName } = useUser();

    let rules = reactive({
        username: [
            { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        password: [
            { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        name: [
            { required: true, validator: validateName, trigger: 'blur' }
        ]
    });

    let drawerRole = ref(false);
    let checkAll = ref(false);
    let isIndeterminate = ref(false);
    let checkeRoles = ref<IRole[]>([]);
    let allRoles = ref<IRole[]>([]);

    let searchUser = ref('');
    let selectUsers = ref<IUser[]>([]);

    onMounted(() => {
        getUserList();
    });

    async function getUserList(page?: number) {
        if (page) {
            currentPage.value = page;
        }
        let result = await requestUserList(currentPage.value, pageSize.value, searchUser.value);
        if (result.code === 200) {
            userList.value = result.data.records;
            totalNum.value = result.data.total;
        }
    }

    function onEditUser(data?: IUser) {
        if (data) {
            Object.assign(user, data);
            userIsSelf = userStore.name === user.username;
        }
        drawer.value = true;
    }

    function closeUserDrawer() {
        drawer.value = false;
        // 此方法要在clearUser之前调用，不然user这个响应式数据里表单用到的三个字段username name password清不掉//
        userForm.value.resetFields();
        clearUser();
    }

    async function comfirmEditUser() {
        try {
            await userForm.value.validate();
            let isAdd = !user.id;
            let needReload = !isAdd && userIsSelf && userStore.name !== user.username;
            let result = isAdd ? await requestAddUser(user) : await requestEditUser(user);
            if (result.code === 200) {
                ElMessage.success(isAdd ? '添加成功' : '修改成功');
                closeUserDrawer();
                getUserList(isAdd ? 1 : currentPage.value);
                // 如果修改的是当前账号的username需要浏览器重新加载一次//
                needReload && window.location.reload();
            }
            else {
                ElMessage.error(isAdd ? '添加失败' : '修改失败');
            }
        } catch (error) {

        }
    }

    function clearUser() {
        userIsSelf = false;
        delete user.id;
        Object.assign(user, {
            createTime: '',
            updateTime: '',
            username: '',
            password: '',
            name: '',
            phone: null,
            roleName: ''
        });
    }

    function onSearch() {
        getUserList(currentPage.value);
        // searchUser.value = '';
    }

    function reset() {
        searchUser.value = '';
        layoutStore.refresh = !layoutStore.refresh;
    }

    async function onRemoveUser(row: IUser) {
        let result = await requestRemoveUser(row.id!);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            getUserList(1);
        }
        else {
            ElMessage.error('删除失败');
        }
    }

    async function onBatchRemoveUser() {
        if (selectUsers.value.length) {
            let ids = selectUsers.value.map(item => item.id!);
            let result = await requestBatchRemoveUser(ids);
            if (result.code === 200) {
                ElMessage.success('批量删除成功');
                getUserList(1);
                selectUsers.value = [];
            }
            else {
                ElMessage.error('批量删除失败');
            }
        }
    }

    function onSelectionChange(selections: IUser[]) {
        selectUsers.value = selections;
    }

    async function assignRole(row: IUser) {
        let result = await requestGetRoles(row.id!);
        if (result.code === 200) {
            Object.assign(user, row);
            allRoles.value = result.data.allRolesList;
            checkeRoles.value = result.data.assignRoles;
            drawerRole.value = true;
            handleCheckedRolesChange(checkeRoles.value);
        }
    }

    function closeRoleDrawer() {
        drawerRole.value = false;
        checkAll.value = false;
        isIndeterminate.value = false;
        checkeRoles.value = [];
        allRoles.value = [];
        clearUser();
    }

    async function comfirmAssignRole() {
        let data: IAssignRoleRequestData = {
            roleIdList: checkeRoles.value.map(item => item.id!),
            userId: user.id!,
            username: user.username
        };
        let isSelf = data.username === userStore.name;
        let result = await requestAssignRoles(data);
        if (result.code === 200) {
            ElMessage.success('分配成功');
            closeRoleDrawer();
            if (isSelf) {
                window.location.reload();
            }
            else {
                getUserList();
            }
        }
        else {
            ElMessage.error('分配失败');
        }
    }

    function handleCheckAllChange(val: boolean) {
        checkeRoles.value = val ? allRoles.value : [];
        isIndeterminate.value = false;
    }

    function handleCheckedRolesChange(roles: IRole[]) {
        let checkCount = roles.length;
        checkAll.value = checkCount === allRoles.value.length;
        isIndeterminate.value = checkCount > 0 && checkCount < allRoles.value.length;
    }
</script>

<style scoped lang="scss">
    .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>