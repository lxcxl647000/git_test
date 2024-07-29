<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" v-if="flag"></component>
    </router-view>
</template>

<script setup lang="ts">
    import useLayoutStore from '@/store/modules/layout';
    import { nextTick, ref, watch } from 'vue';

    // 控制当前组件是否销毁重建//
    let flag = ref(true);

    let layoutStore = useLayoutStore();

    // 监听仓库内数据是否发生变化，发生了则表示用户点击了刷新按钮//
    watch(() => layoutStore.refresh, () => {
        // 点击刷新按钮 路由组件销毁//
        flag.value = false;
        // 下一帧又创建出来//
        nextTick(() => {
            flag.value = true;
        });
    });
</script>

<style scoped></style>