<template>
    <div class="sex">
        <p class="title">男女比例</p>
        <p class="titleImg"></p>
        <div class="role">
            <div class="men">
                <div class="menTitle">
                    <span>男士</span>
                </div>
                <div class="menImg">
                    <img src="../../../images/man.png" alt="">
                </div>
                <div class="menRate">
                    <span>男士{{ menRate }}%</span>
                </div>
            </div>
            <div class="women">
                <div class="womenTitle">
                    <span>女士</span>
                </div>
                <div class="womenImg">
                    <img src="../../../images/woman.png" alt="">
                </div>
                <div class="womenRate">
                    <span>女士{{ womenRate }}%</span>
                </div>
            </div>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import * as echarts from 'echarts';

    let charts = ref();
    let menRate = ref(60);
    let womenRate = ref(40);

    onMounted(() => {
        createCharts();
    });

    function createCharts() {
        let mCharts = echarts.init(charts.value);
        mCharts.setOption({
            xAxis: {
                show: false,
                min: 0,
                max: 100
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    data: [menRate.value],
                    barWidth: 25,
                    itemStyle: {
                        borderRadius: 20,
                    },
                    z: 3
                },
                {
                    type: 'bar',
                    data: [100],
                    barWidth: 25,
                    itemStyle: {
                        color: 'hotpink',
                        borderRadius: 20,
                    },
                    barGap: '-100%'
                },
            ],
            grid: {
                top:70
            }
        });
    }
</script>

<style scoped lang="scss">
    .sex {
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
            background-size: 100% 100%;
            margin-top: 5px;
        }

        .role {
            display: flex;
            justify-content: center;

            .men {
                width: 111px;
                height: 116px;
                background: url(../../../images/man-bg.png) no-repeat;
                background-size: 100% 100%;
                margin: 40px 20px;
                // display: flex;
                // justify-content: center;
                // align-items: center;

                .menTitle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }

                .menImg {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                }

                .menRate {
                    color: white;
                    margin-top: 40px;
                }
            }

            .women {
                width: 111px;
                height: 116px;
                background: url(../../../images/woman-bg.png) no-repeat;
                background-size: 100% 100%;
                margin: 40px 20px;
                // display: flex;
                // justify-content: center;
                // align-items: center;

                .womenTitle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }

                .womenImg {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 15px;
                }

                .womenRate {
                    color: white;
                    margin-top: 40px;
                    float: right;
                }
            }
        }

        .charts {
            width: 100%;
            height: 30px;
            margin-top: 20px;
        }
    }
</style>