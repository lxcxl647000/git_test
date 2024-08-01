<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!-- 表格 
            table：
                border可以设置表格纵向是否有边框
            table-column： 
                label：某一列
                width：设置这一列的宽度
                align：设置这一列对齐方式
        -->
        <el-table border style="margin: 10px 0px;">
            <el-table-column label="序号" width="80px" align="center" />
            <el-table-column label="品牌名称" />
            <el-table-column label="品牌LOGO" />
            <el-table-column label="品牌操作" />
        </el-table>
        <!-- 分页 
             v-model:current-page：当前页码
             v-model:page-size：每页展示多少条数据
             page-sizes：每页显示个数选择器的选项设置
             size：分页大小 large default small
             background：是否为分页按钮添加背景色
             layout：组件布局，子组件名用逗号分隔
        -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper, -> , sizes , total" :total="400" />
    </el-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    let currentPage = ref<number>(1);
    let pageSize = ref<number>(3);
</script>

<style scoped></style>