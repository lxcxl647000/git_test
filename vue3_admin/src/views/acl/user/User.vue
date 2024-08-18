<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="searchUser"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="onSearch">搜索</el-button>
                <el-button size="default" @click="">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="onEditUser">添加</el-button>
        <el-button type="danger" size="default" @click="onBatchRemoveUser">批量删除</el-button>
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
                    <el-button type="primary" size="small" @click="" icon="User">分配角色</el-button>
                    <el-button type="primary" size="small" @click="onEditUser(row)" icon="Edit">编辑</el-button>
                    <el-popconfirm :title="`确定删除${row.username}吗?`" @confirm="onRemoveUser(row)" width="200px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
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
            <el-form ref="userForm" :model="user" :rules="userRules">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请填写用户名字" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
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
</template>

<script setup lang="ts">
    import { requestAddUser, requestBatchRemoveUser, requestEditUser, requestRemoveUser, requestUserList } from '@/api/acl/user';
    import type { IUser } from '@/api/acl/user/type';
    import useUser from '@/hooks/useUser';
    import { ElMessage } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';

    let currentPage = ref(1);
    let totalNum = ref(0);
    let pageSize = ref(5);

    let userList = ref<IUser[]>([]);

    let drawer = ref(false);
    // 被添加或修改的用户//
    let user = reactive<IUser>({
        createTime: '',
        updateTime: '',
        username: '',
        password: '',
        name: '',
        phone: null,
        roleName: ''
    });
    let userForm = ref();
    let { userRules } = useUser();

    let searchUser = ref('');
    let selectUsers = ref<IUser[]>([]);

    onMounted(() => {
        getUserList();
    });

    async function getUserList(page?: number | null) {
        if (page) {
            currentPage.value = page;
        }
        let result = await requestUserList(currentPage.value, pageSize.value);
        if (result.code === 200) {
            userList.value = result.data.records;
            totalNum.value = result.data.total;
        }
    }

    function onEditUser(data?: IUser) {
        if (data) {
            Object.assign(user, data);
        }
        drawer.value = true;
    }

    function closeUserDrawer() {
        drawer.value = false;
        clearAddUser();
        userForm.value.resetFields();
    }

    async function comfirmEditUser() {
        await userForm.value.validate();
        if (!user.name) {
            return;
        }
        let isAdd = !user.id;
        let result = isAdd ? await requestAddUser(user) : await requestEditUser(user);
        if (result.code === 200) {
            ElMessage.success(isAdd ? '添加成功' : '修改成功');
            closeUserDrawer();
            getUserList(isAdd ? 1 : null);
        }
        else {
            ElMessage.error(isAdd ? '添加失败' : '修改失败');
        }
    }

    function clearAddUser() {
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
            let ids = [];
            for (let user of selectUsers.value) {
                ids.push(user.id!);
            }
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
</script>

<style scoped lang="scss">
    .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>