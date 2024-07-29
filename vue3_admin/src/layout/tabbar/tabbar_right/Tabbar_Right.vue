<template>
    <div class="tabbar_right">
        <el-button icon="Refresh" size="default" circle></el-button>
        <el-button icon="FullScreen" size="default" circle></el-button>
        <el-button icon="Setting" size="default" circle></el-button>
        <img src="../../../../public/logo.png" alt="" style="width: 32px;height: 32px;margin: 0px 10px;">
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .tabbar_right {
        display: flex;
        align-items: center;
    }
</style>