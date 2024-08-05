<template>
    <el-dialog v-model="dialogFormVisible" :title=title @close="closeDialog">
        <el-form style="width: 80%;" label-width="80px">
            <el-form-item label="品牌名称">
                <el-input placeholder="请输入品牌名称" v-model="trademark.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
                    <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button type="primary" size="default" @click="onCancel">取消</el-button>
            <el-button type="primary" size="default" @click="onConfirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { requestAddTrademark, requestEditTrademark } from '@/api/product/trademark';
    import type { ITrademarkRecord } from '@/api/product/trademark/type';
    import { computed, inject, reactive, toRef } from 'vue';
    import { ElMessage, type UploadProps } from 'element-plus'

    let props = defineProps(['getHadTrademark']);

    let dialogFormVisible = toRef(inject('dialogFormVisible'));

    let trademark = inject<ITrademarkRecord>('trademark') || reactive<ITrademarkRecord>({ tmName: '', logoUrl: '' });
    let title = computed(() => {
        return trademark.id ? '编辑品牌' : '添加品牌';
    });

    function onCancel() {
        dialogFormVisible.value = false;
    }

    function onConfirm() {
        dialogFormVisible.value = false;
        trademarkOperate();
    }

    async function trademarkOperate() {
        let isAdd = trademark.id ? false : true;
        let successMsg = isAdd ? '添加品牌成功' : '修改品牌成功';
        let failMsg = isAdd ? '添加品牌失败' : '修改品牌失败';
        let result = isAdd ? await requestAddTrademark(trademark) : await requestEditTrademark(trademark);;
        if (result.code === 200) {
            ElMessage.success(successMsg);
            props.getHadTrademark();
        }
        else {
            ElMessage.error(failMsg);
        }
        dialogFormVisible.value = false;
    }

    function closeDialog() {
        delete trademark.id;
        trademark.logoUrl = '';
        trademark.tmName = '';
    }

    // 上传图片之前的钩子 限制格式和大小//
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
            ElMessage.error('上传图片的格式必须为jpg、png、gif');
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('上传图片的大小不能超过2M')
            return false
        }
        return true
    }

    // 上传图片成功的钩子//
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        // response为上传图片请求返回的数据//
        trademark.logoUrl = response.data;
    }
</script>

<style scoped>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>