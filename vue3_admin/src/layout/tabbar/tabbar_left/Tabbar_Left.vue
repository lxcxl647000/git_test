<template>
    <div class="tabbar_left">
        <el-icon style="margin-right: 10px;">
            <Expand />
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
</style>