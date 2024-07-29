<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 无子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="item.meta.show" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有且只有一个子路由 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item v-if="item.children[0].meta.show" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有且至少有2个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <MenuList :menuList="item.children"></MenuList>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts" name="MenuList">
    import { useRouter } from 'vue-router';

    defineProps(['menuList']);

    let router = useRouter();

    function goRoute(vc: any) {
        router.push(vc.index);
    }
</script>

<style scoped></style>