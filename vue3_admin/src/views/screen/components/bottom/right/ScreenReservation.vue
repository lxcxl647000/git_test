<template>
    <div class="reservation">
        <p class="title">预约渠道数据统计</p>
        <img src="../../../images/dataScreen-title.png" alt="" class="titleImg">
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import * as echarts from 'echarts';

    let charts = ref();

    let datas = [
        {
            name: '智慧文旅',
            value: 9851,
        },
        {
            name: '携程',
            value: 6589,
        },
        {
            name: '飞猪',
            value: 3589,
        },
        {
            name: '其他',
            value: 1563,
        },
    ];

    let xAxisDatas = datas.map(data => data.name);

    onMounted(() => {
        createCharts();
    });

    function createCharts() {
        let mChart = echarts.init(charts.value);
        let options = {
            xAxis: {
                type: 'category',
                data: xAxisDatas
            },
            yAxis: {
                axisLine: {
                    show: true,
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                data: datas
            }],
            grid: {
                left: 60
            }
        };
        mChart.setOption(options);
    }
</script>

<style scoped lang="scss">
    .reservation {
        width: 392px;
        height: 310px;
        background: url(../../../images/dataScreen-main-rb.png) no-repeat;
        background-size: cover;

        .title {
            color: white;
            font-size: 15px;
        }

        .charts {
            height: 100%;
        }
    }
</style>