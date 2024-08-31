<template>
    <el-table :data="allPermission" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
            <template #="{ row, $index }">
                <el-button type="primary" size="small" @click="addPermissionOrFunction(row)"
                    :disabled="row.level === 4 ? true : false" v-btnPermission="`btn.Permission.add`">
                    {{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button>
                <el-button type="primary" size="small" @click="editPermission(row)"
                    :disabled="row.level === 1 ? true : false" v-btnPermission="`btn.Permission.update`">编辑</el-button>
                <el-popconfirm :title="`确定删除${row.name}?`" width="200px" @confirm="removePermission(row)">
                    <template #reference>
                        <el-button type="primary" size="small" :disabled="row.level === 1 ? true : false"
                            v-btnPermission="`btn.Permission.remove`">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加菜单 -->
    <el-dialog v-model="dialogVisible" :title="permission.id ? '修改' : '添加'" width="500px" @close="closeDialog">
        <el-form :model="permission" ref="form" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="名称" prop="name">
                <el-input v-model="permission.name" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="权限值" prop="code">
                <el-input v-model="permission.code" placeholder="请填写权限值"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button size="default" @click="closeDialog">取消</el-button>
            <el-button type="primary" size="default" @click="comfirmDialog">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { requestAddPermission, requestAllAssignPermission, requestEditPermission, requestRemovePermission } from '@/api/acl/menu';
    import type { IPermissionData } from '@/api/acl/menu/type';
    import { ElMessage } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';

    let allPermission = ref<IPermissionData[]>([]);

    let dialogVisible = ref(false);
    let form = ref();
    let rules = reactive({
        name: [
            { required: true, validator: validateName, trigger: 'blur' }
        ]
    });

    let permission = reactive<IPermissionData>({
        createTime: '',
        updateTime: '',
        pid: 0,
        name: '',
        code: null,
        toCode: null,
        type: 0,
        status: null,
        level: 0,
        children: [],
        select: false
    });

    onMounted(() => {
        getAllPermission();
    });

    async function getAllPermission() {
        let result = await requestAllAssignPermission();
        if (result.code === 200) {
            allPermission.value = result.data;
        }
    }

    function validateName(rule: any, value: any, callback: any) {
        if (value.trim().length < 1) {
            callback(new Error('名称不能为空'));
        }
        else {
            callback();
        }
    }

    function addPermissionOrFunction(row: IPermissionData) {
        dialogVisible.value = true;
        permission.pid = row.id!;
    }

    function editPermission(row: IPermissionData) {
        dialogVisible.value = true;
        Object.assign(permission, row);
    }

    function clearData() {
        delete permission.id;
        Object.assign(permission, {
            createTime: '',
            updateTime: '',
            pid: 0,
            name: '',
            code: null,
            toCode: null,
            type: 0,
            status: null,
            level: 0,
            children: [],
            select: false
        });
    }

    function closeDialog() {
        if (dialogVisible.value) {
            dialogVisible.value = false;
            form.value.resetFields();
            clearData();
        }
    }

    async function comfirmDialog() {
        try {
            await form.value.validate();
            let isAdd = permission.id == undefined;
            let result = !isAdd ? await requestEditPermission(permission) : await requestAddPermission(permission);
            if (result.code === 200) {
                ElMessage.success(isAdd ? '添加成功' : '修改成功');
                closeDialog();
                getAllPermission();
            }
            else {
                ElMessage.error(isAdd ? '添加失败' : '修改失败');
            }
        } catch (error) {

        }
    }

    async function removePermission(row: IPermissionData) {
        let result = await requestRemovePermission(row.id!);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            getAllPermission();
        }
        else {
            ElMessage.error('删除失败');
        }
    }
</script>

<style scoped></style>