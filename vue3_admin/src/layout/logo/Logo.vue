<template>
    <div class="logo" v-if="setting.showLogo">
        <img v-if="imgUrl" :src="imgUrl" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import setting from '@/setting'

    let imgUrl = ref(setting.logo);
</script>

<style scoped lang="scss" name="Logo">
    .logo {
        width: 100%;
        height: $base-menu-logo-height;
        display: flex;
        align-items: center;
        padding: 20px;

        img {
            width: $base-menu-logo-pic-width;
            height: $base-menu-logo-pic-height;
        }

        p {
            color: white;
            margin-left: 10px;
            font-size: $base-menu-logo-title-size;
        }
    }
</style>