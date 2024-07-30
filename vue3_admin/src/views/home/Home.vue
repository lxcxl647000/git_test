<template>
    <h1>一级路由---首页</h1>
    <img :src="userStore.avatar" alt="" style="width: 100px;height: 100px;margin: 10px 10px; border-radius: 50%;">
    <h2>{{ userStore.username }}</h2>
</template>

<script setup lang="ts" name="Home">
    import useUserStore from '@/store/modules/user';
    import { ElNotification } from 'element-plus';
    import { onMounted } from 'vue';

    let userStore = useUserStore();

    onMounted(async () => {
        try {
            await userStore.userInfo();
        } catch (error: any) {
            ElNotification({
                type: 'error',
                message: error
            });
        }
    })
</script>

<style scoped></style>