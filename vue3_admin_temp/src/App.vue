<template>
  <h1>hello</h1>
  <el-button type="primary" size="default" @click="count++" :icon="Check">add:{{ count }}</el-button>
  <el-button type="danger" size="medium" @click="" :icon="Delete">删除订单</el-button>

  <el-pagination :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" />

</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Check, Delete } from '@element-plus/icons-vue';

  let count = ref(0);
</script>

<style scoped></style>