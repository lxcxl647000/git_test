<template>
    <div class="bg">
        <img src="../../assets/images/error_images/401.png" alt="">
        <el-button type="primary" size="large" @click="goHome" class="btn">首页</el-button>
    </div>
</template>

<script setup lang="ts" name="404">
    import { useRouter } from 'vue-router';

    let router = useRouter();

    function goHome() {
        router.push({ path: '/home' });
    }
</script>

<style scoped lang="scss">
    .bg {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background: skyblue;

        img {
            width: 1014px;
            height: 556px;
        }

        .btn {
            position: relative;
            left: -30%;
            top: 70%;
        }
    }
</style>