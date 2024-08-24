<template>
    <div class="top">
        <div class="left">
            <span class="lbt" @click="goHome" style="cursor: pointer;">首页</span>
        </div>
        <div class="center">智慧旅游可视化大数据展示平台</div>
        <div class="right">
            <span class="rbt" style="cursor: pointer;">统计报告</span>
            <span class="time">当前时间：{{ timeStr }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    let router = useRouter();

    let timer = ref(0);
    let timeStr = ref(dayjs().format('YYYY年MM月DD日hh:mm:ss'));

    onMounted(() => {
        timer.value = setInterval(() => {
            timeStr.value = dayjs().format('YYYY年MM月DD日HH:mm:ss');
        }, 1000);
    });

    onBeforeUnmount(() => {
        clearInterval(timer.value);
    });

    function goHome() {
        router.push('/home');
    }
</script>

<style scoped lang="scss">
    .top {
        display: flex;

        .left {
            flex: 1.5;
            background: url(../images/dataScreen-header-left-bg.png) no-repeat;
            background-size: cover;

            .lbt {
                width: 135px;
                height: 42px;
                background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
                background-size: cover;
                float: right;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                color: #29fcff;
            }
        }

        .center {
            flex: 2;
            width: 100%;
            height: 74px;
            background: url(../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 70px;
            font-size: 30px;
            color: #29fcff;
        }

        .right {
            flex: 1.5;
            background: url(../images/dataScreen-header-right-bg.png) no-repeat;
            background-size: cover;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .rbt {
                width: 135px;
                height: 42px;
                background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
                background-size: cover;
                float: left;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                color: #29fcff;
            }

            .time {
                margin-right: 10px;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                color: #29fcff;
            }
        }
    }
</style>