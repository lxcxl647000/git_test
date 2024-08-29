<template>
    <div class="age">
        <p class="title">年龄比例</p>
        <img src="../../../images/dataScreen-title.png" alt="" class="titleImg">
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts';
    import { computed, onMounted, ref } from 'vue';

    let charts = ref();

    let data = ref([
        { value: 153, name: '10岁以下' },
        { value: 569, name: '10-18岁' },
        { value: 423, name: '18-30岁' },
        { value: 275, name: '30-40岁' },
        { value: 127, name: '40-60岁' },
        { value: 96, name: '60岁以上' },
    ]);

    let total = computed(() => {
        let t = 0;
        for (let d of data.value) {
            t += d.value;
        }

        return t;
    });

    onMounted(() => {
        createCharts();
    });

    function createCharts() {
        let mCharts = echarts.init(charts.value);
        let options = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 30,
                left: 250,
                orient: 'vertical',
                textStyle: {
                    color: 'white',
                },
                formatter: function (name: string) {
                    let value = data.value.find(item => item.name === name)?.value;
                    let percent = ((value! / total.value) * 100).toFixed(0);
                    return name + '  ' + percent + '%';
                },
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        color: 'white'
                    },
                    labelLine: {
                        show: false
                    },
                    data: data.value,
                    center: ['35%', '50%']
                }
            ],
        }
        mCharts.setOption(options);
    }
</script>

<style scoped lang="scss">
    .age {
        width: 391px;
        height: 310px;
        background: url(../../../images/dataScreen-main-lt.png) no-repeat;
        background-size: cover;

        .title {
            font-size: 15px;
            color: white;
        }

        .charts {
            width: 100%;
            height: 265px;
        }
    }
</style>