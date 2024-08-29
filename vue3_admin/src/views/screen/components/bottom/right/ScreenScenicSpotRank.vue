<template>
    <div class="scenicspot">
        <p class="title">热门景区排行</p>
        <img src="../../../images/dataScreen-title.png" alt="" class="titleImg">
        <div class="titleBg">
            <span class="rank">排名</span>
            <span class="scenic">景区</span>
            <span class="reservation">预约数量</span>
        </div>
        <div class="progress">
            <ScreenRankItem v-for="(item, index) in rankData" :key="index" :rankData="item"></ScreenRankItem>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import ScreenRankItem from './ScreenRankItem.vue';

    let rankData = ref([
        { rank: 1, name: '峨眉山', count: 80000, total: 100000 },
        { rank: 2, name: '稻城亚丁', count: 60000, total: 100000 },
        { rank: 3, name: '九寨沟', count: 50000, total: 100000 },
        { rank: 4, name: '万里长城', count: 40000, total: 100000 },
        { rank: 5, name: '北京故宫', count: 30000, total: 100000 },
    ]);
</script>

<style scoped lang="scss">
    .scenicspot {
        width: 390px;
        height: 319px;
        background: url(../../../images/dataScreen-main-rt.png) no-repeat;
        background-size: cover;

        .title {
            color: white;
            font-size: 15px;
        }

        .titleBg {
            width: 351px;
            height: 36px;
            background: url(../../../images/rankingChart-bg.png) no-repeat;
            background-size: cover;
            margin-top: 10px;
            margin-left: 20px;
            display: flex;
            text-align: center;
            line-height: 36px;

            .rank {
                flex: 1;
                color: yellow;
            }

            .scenic {
                flex: 2;
                color: yellow;
            }

            .reservation {
                flex: 3;
                color: yellow;
            }
        }

        .progress {
            margin-top: 20px;
        }
    }
</style>