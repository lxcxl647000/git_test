<template>
    <div class="tabbar_right">
        <el-button icon="Refresh" size="default" circle @click="onRefresh"></el-button>
        <el-button icon="FullScreen" size="default" circle @click="onFullScreen"></el-button>
        <el-button icon="Setting" size="default" circle @click="openDrawer"></el-button>
        <img :src="userStore.avatar" alt="" style="width: 32px;height: 32px;margin: 0px 10px; border-radius: 50%;">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.name }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 主题设置 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>主题设置</h4>
            </template>
            <template #default>
                <el-form label-width="80px" :inline="false" size="normal">
                    <el-form-item label="主题颜色">
                        <el-color-picker v-model="color" show-alpha @change="setColor" />
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch v-model="dark" style="margin-left: 24px" inline-prompt active-icon="Moon"
                            inactive-icon="Sunny" @change="changeDark" />
                    </el-form-item>
                </el-form>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import useLayoutStore from '@/store/modules/layout';
    import useUserStore from '@/store/modules/user';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    let layoutStore = useLayoutStore();

    let userStore = useUserStore();
    let route = useRoute();
    let router = useRouter();

    let drawer = ref(false);
    let color = ref('rgba(19, 206, 102, 0.8)');
    let dark = ref(false);

    function onRefresh() {
        layoutStore.refresh = !layoutStore.refresh;
    }

    function onFullScreen() {
        // DOM对象判断是否全屏 但是又浏览器兼容问题 可以用插件代替//
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            document.documentElement.requestFullscreen();
        }
    }

    async function onLogout() {
        try {
            await userStore.userLogout();
            router.push({ path: '/login', query: { redirect: route.path } });
        } catch (error) {

        }
    }

    function openDrawer() {
        drawer.value = true;
    }

    function changeDark() {
        let html = document.documentElement;
        html.className = dark.value ? 'dark' : '';
    }

    function setColor() {
        console.log(color.value);
        let html = document.documentElement;
        html.style.setProperty('--el-color-primary', color.value);
    }
</script>

<style scoped lang="scss">
    .tabbar_right {
        display: flex;
        align-items: center;
    }
</style>