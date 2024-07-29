<template>
    <el-scrollbar class="scrollbar">
        <el-menu :default-active="$route.path" background-color="#001529" text-color="white">
            <MenuList :menuList="menuList"></MenuList>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts" name="Menu">
    import MenuList from '@/components/MenuList.vue';
    import useUserStore from '@/store/modules/user';
    import { useRoute } from 'vue-router';

    let userStore = useUserStore();
    let menuList = userStore.routes;
    let $route = useRoute();
</script>

<style scoped lang="scss">
    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .el-menu {
            border-right: none;
        }
    }
</style>