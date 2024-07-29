<template>
    <div class="tabbar">
        <!-- 左边 -->
        <Tabbar_Left />
        <!-- 右边 -->
        <Tabbar_Right />
    </div>

</template>

<script setup lang="ts">
    import Tabbar_Left from './tabbar_left/Tabbar_Left.vue';
    import Tabbar_Right from './tabbar_right/Tabbar_Right.vue';
</script>

<style scoped lang="scss">
    .tabbar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>