<template>
    <div class="layout_container">
        <!-- 左边菜单 -->
        <div class="layout_left">
            <Logo></Logo>
            <Menu></Menu>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_top" :class="{ fold: layoutStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示 -->
        <div class="layout_display" :class="{ fold: layoutStore.fold ? true : false }">
            <Display></Display>
        </div>
    </div>
</template>

<script setup lang="ts" name="Layout">
    import Logo from './logo/Logo.vue'
    import Menu from './menu/Menu.vue'
    import Display from './display/Display.vue';
    import Tabbar from './tabbar/Tabbar.vue';
    import useLayoutStore from '@/store/modules/layout';

    let layoutStore = useLayoutStore();
</script>

<style scoped lang="scss">
    .layout_container {
        width: 100%;
        height: 100vh;

        .layout_left {
            width: $base-menu-width;
            height: 100vh;
            background: $base-menu-background;
        }

        .layout_top {
            position: fixed;
            width: calc(100% - $base-menu-width);
            height: $base-top-height;
            top: 0px;
            left: $base-menu-width;
            transition: all 0.3s;
            background: white;

            &.fold {
                width: calc(100% - $base-menu-min-width);
                left: $base-menu-min-width;
            }
        }

        .layout_display {
            position: fixed;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-top-height);
            top: $base-top-height;
            left: $base-menu-width;
            padding: 20px;
            overflow: auto;
            transition: all 0.3s;

            &.fold {
                width: calc(100% - $base-menu-min-width);
                left: $base-menu-min-width;
            }
        }
    }
</style>