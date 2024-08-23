<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt=""
                style="width: 100px;height: 100px;margin: 10px 10px; border-radius: 50%;">
            <div class="bottom">
                <h2 class="title">{{ getCurrentTimeDes() + '好' + userStore.name }}</h2>
                <p class="content">后台管理系统</p>
            </div>
        </div>
    </el-card>
    <div class="svg">
        <SvgIcon name="welcome" width="512" height="626"></SvgIcon>
    </div>
    <el-color-picker v-model="color" show-alpha />
</template>

<script setup lang="ts" name="Home">
    import useUserStore from '@/store/modules/user';
    import { getCurrentTimeDes } from '@/utils/time';
    import SvgIcon from '@/components/SvgIcon.vue';
    import { ref } from 'vue'

    let userStore = useUserStore();



    const color = ref('rgba(19, 206, 102, 0.8)')
</script>

<style scoped lang="scss">
    .box {
        display: flex;

        .bottom {
            margin-left: 20px;
            margin-top: 25px;

            .title {
                font-size: 25px;
                font-weight: 900;
            }

            .content {
                margin-top: 20px;
                font-size: 20px;
                font-weight: 600;
                color: grey;
                font-style: italic;
            }
        }
    }

    .svg {
        display: flex;
        justify-content: center;
    }
</style>