<template>
    <div class="tabbar_left">
        <el-icon style="margin-right: 10px" @click="changeIcon">
            <component :is="layoutStore.fold ? 'Fold' : 'Expand'"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
                :to="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
    import useLayoutStore from '@/store/modules/layout';
    import { useRoute } from 'vue-router';

    // 仓库中state里的fold表示菜单折叠状态 true折叠 false展开//
    let layoutStore = useLayoutStore();

    let $route = useRoute();

    function changeIcon() {
        layoutStore.fold = !layoutStore.fold;
    }
</script>

<style scoped lang="scss">
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
</style>