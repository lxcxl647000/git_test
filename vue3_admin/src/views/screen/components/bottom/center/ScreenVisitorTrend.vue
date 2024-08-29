<template>
    <div class="trend">
        <p class="title">未来30天游客量趋势图</p>
        <img src="../../../images/dataScreen-title.png" alt="" class="titleImg">
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts';
    import { onMounted, ref } from 'vue';

    let charts = ref();

    onMounted(() => {
        createCharts();
    });

    function createCharts() {
        let mChart = echarts.init(charts.value);
        let options = {
            title: {
                text: '(访问量)',
                top: 25
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                // 两侧不留白//
                boundaryGap: false,
                // 分割线//
                splitLine: {
                    show: false,
                }
            },
            yAxis: {
                // 分割线//
                splitLine: {
                    show: false,
                },
                // 轴线的设置//
                axisLine: {
                    show: true
                },
                // 刻度//
                axisTick: {
                    show: true
                }
            },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: '#5470C6',
                        width: 2
                    },
                    data: [
                        ['05/04', 200],
                        ['05/05', 1560],
                        ['05/06', 750],
                        ['05/07', 1580],
                        ['05/08', 250],
                        ['05/09', 1300],
                        ['05/10', 450],
                    ],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'orange' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            grid: {
                top: 60,
                bottom: 60,
                left: 50,
                right: 40
            }
        };
        mChart.setOption(options);
    }
</script>

<style scoped lang="scss">
    .trend {
        width: 962px;
        height: 310px;
        background: url(../../../images/dataScreen-main-cb.png) no-repeat;
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