<template>
    <div class="visitor">
        <p class="title">实时游客统计</p>
        <p class="titleImg"></p>
        <p class="tip">可预约总量<span>{{ totalCount }}</span>人</p>
        <div class="peopleCount">
            <span class="num" v-for="(item, index) in peopleCountStr" :key="index">{{ item }}</span>
        </div>
        <!-- echarts展示图形图表的节点 -->
        <div class="charts" ref="charts">
            <span class="reservationTitle">预约量</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import * as echarts from 'echarts';
    import 'echarts-liquidfill';

    let peopleCount = ref(62369);
    let totalCount = ref(999999);

    let charts = ref();

    onMounted(() => {
        createCharts();
    });

    let peopleCountStr = computed(() => {
        return peopleCount.value + '人';
    });

    function createCharts() {
        // 获取echarts类的实例//
        let mCharts = echarts.init(charts.value);
        // 设置实例的配置项//
        mCharts.setOption({
            // 标题组件//
            title: {
                text: ''
            },
            // x y轴组件//
            xAxis: {},
            yAxis: {},
            // 系列 决定展示什么样的图形图表//
            series: {
                type: 'liquidFill',
                data: [peopleCount.value / totalCount.value],
                radius: '80%',
                label: {
                    show: false
                }
            },
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        });
    }
</script>

<style scoped lang="scss">
    .visitor {
        width: 391px;
        height: 321px;
        background: url(../../../images/dataScreen-main-lt.png) no-repeat;
        background-size: cover;

        .title {
            font-size: 15px;
            color: white;
        }

        .titleImg {
            height: 7px;
            width: 68px;
            background: url(../../../images/dataScreen-title.png) no-repeat;
            background-size: cover;
            margin-top: 5px;
        }

        .tip {
            color: white;
            font-size: 13px;
            position: absolute;
            right: 1490px;
            direction: rtl;
            text-align: right;

            span {
                color: orange;
            }
        }

        .peopleCount {
            width: 350px;
            height: 40px;
            margin-top: 30px;
            margin-left: 20px;
            display: flex;

            .num {
                flex: 1;
                height: 40px;
                font-weight: 500;
                font-size: 20px;
                text-align: center;
                line-height: 40px;
                color: #29fcff;
                background: url(../../../images/total.png) no-repeat;
                background-size: 100% 100%;
            }
        }

        .charts {
            width: 100%;
            height: 218px;

            .reservationTitle {
                font-size: 20px;
                font-weight: 600;
                position: relative;
                left: 165px;
                top: -120px;
            }
        }
    }
</style>