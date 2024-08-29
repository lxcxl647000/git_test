<template>
    <div class="visitorcompared">
        <p class="title">年度游客量对比</p>
        <img src="../../../images/dataScreen-title.png" alt="" class="titleImg">
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts';
    import { onMounted, ref } from 'vue';

    let charts = ref();

    let datas = {
        '2021': [200, 1560, 750, 1580, 250, 1300, 450, 1450, 450, 950, 350, 1650],
        '2022': [1200, 1560, 350, 580, 1150, 1300, 300, 450, 850, 1450, 1350, 650],
        '2023': [200, 560, 1350, 1580, 150, 1300, 1450, 350, 450, 150, 350, 1650],
    };

    let xAxisData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    onMounted(() => {
        createCharts();
    });

    function createCharts() {
        let mChart = echarts.init(charts.value);
        let options = {
            title: {
                text: '(人数)',
                top: 25
            },
            legend: {
                data: [
                    {
                        name: '2021',
                        itemStyle: {
                            color: 'orange'
                        }
                    },
                    {
                        name: '2022',
                        itemStyle: {
                            color: 'blue'
                        }
                    },
                    {
                        name: '2023',
                        itemStyle: {
                            color: 'red'
                        }
                    },
                ],
                icon: 'rect',
                top: 10,
                textStyle: {
                    color: 'white'
                }
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
                },
                data: xAxisData,
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
                    name: '2021',
                    smooth: true,
                    lineStyle: {
                        color: 'orange',
                        width: 2
                    },
                    data: datas['2021'],
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
                    },
                    itemStyle: {
                        color: 'orange'
                    }
                },
                {
                    type: 'line',
                    name: '2022',
                    smooth: true,
                    lineStyle: {
                        color: 'blue',
                        width: 2
                    },
                    data: datas['2022'],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: 'blue'
                    }
                },
                {
                    type: 'line',
                    name: '2023',
                    smooth: true,
                    lineStyle: {
                        color: 'red',
                        width: 2
                    },
                    data: datas['2023'],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: 'red'
                    }
                }
            ],
            grid: {
                top: 60,
                bottom: 60,
                left: 50,
                right: 10
            }
        };
        mChart.setOption(options);
    }
</script>

<style scoped lang="scss">
    .visitorcompared {
        width: 390px;
        height: 319px;
        background: url(../../../images/dataScreen-main-rt.png) no-repeat;
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