<template>
    <div class="progress">
        <span class="rank">NO.{{ rankData.rank }}</span>
        <span class="scenic">{{ rankData.name }}</span>
        <el-progress class="reservation" :percentage="percentage" :color="color[rankData.rank - 1]" :stroke-width="16"
            style="width: 120px;" :text-inside="true">
        </el-progress>
        <span class="count">{{ countStr }}</span>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    let data = defineProps(['rankData']);

    let color = ref(['#f56c6c', '#e6a23c', '#5cb87a', '#1989fa', '#6f7ad3']);
    let percentage = computed(() => {
        return data.rankData.count / data.rankData.total * 100;
    });
    let countStr = computed(() => {
        return (data.rankData.count / 10000).toFixed(2) + 'w';
    });

</script>

<style scoped lang="scss">
    .progress {
        color: white;
        display: flex;

        .rank {
            position: relative;
            left: 8%;
        }

        .scenic {
            position: relative;
            left: 18%;
            width: 80px;
        }

        .reservation {
            position: relative;
            left: 23%;
        }

        .count {
            position: relative;
            left: 25%;
        }
    }
</style>