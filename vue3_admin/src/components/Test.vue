<template>
    <h1>hello</h1>
    <h2>{{ count }}</h2>
    <el-button type="primary" size="default" @click="addCount" :icon="Plus"></el-button>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Plus } from '@element-plus/icons-vue';

    let count = ref(0);
    function addCount() {
        count.value++;
    }
</script>

<style scoped></style>