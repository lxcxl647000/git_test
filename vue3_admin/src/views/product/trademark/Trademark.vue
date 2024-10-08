<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
            v-btnPermission="`btn.Trademark.add`">添加品牌</el-button>
        <!-- 表格 
            table：
                border可以设置表格纵向是否有边框
            table-column： 
                label：某一列
                width：设置这一列的宽度
                align：设置这一列对齐方式
        -->
        <el-table :data="records" border style="margin: 10px 0px;">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #default="{ row }">
                    <img :src="row.logoUrl" alt="" style="height: 80px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="default" icon="Edit" @click="editTrademark(row)"
                        v-btnPermission="`btn.Trademark.update`"></el-button>
                    <el-popconfirm :title="`是否删除${row.tmName}?`" width="200px" @confirm="deleteTrademark(row.id)"
                        icon="Delete">
                        <template #reference>
                            <el-button type="primary" size="default" icon="Delete"
                                v-btnPermission="`btn.Trademark.remove`"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
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
            :background="true" layout="prev, pager, next, jumper, -> , sizes , total" :total="total"
            @change="getHadTrademark" />
    </el-card>
    <TrademarkDialog :getHadTrademark="getHadTrademark"></TrademarkDialog>
</template>

<script setup lang="ts">
    import { requestDeleteTrademark, requestHadTrademark } from '@/api/product/trademark';
    import { onMounted, provide, reactive, ref } from 'vue';
    import TrademarkDialog from '@/components/TrademarkDialog.vue';
    import type { ITrademarkRecord, ITrademarkResponseData } from '@/api/product/trademark/type';
    import { ElMessage } from 'element-plus';

    let currentPage = ref<number>(1);
    let pageSize = ref<number>(3);
    let total = ref<number>(0);
    let records = ref<ITrademarkRecord[]>([]);

    let dialogFormVisible = ref(false);
    let trademark = reactive<ITrademarkRecord>({ tmName: '', logoUrl: '' });

    provide('dialogFormVisible', dialogFormVisible);
    provide('trademark', trademark);

    onMounted(() => {
        getHadTrademark();
    });

    async function getHadTrademark() {
        let result: ITrademarkResponseData = await requestHadTrademark(currentPage.value, pageSize.value);
        if (result.code === 200) {
            total.value = result.data.total;
            records.value = result.data.records;
        }
    }

    function addTrademark() {
        dialogFormVisible.value = true;
    }

    function editTrademark(row: ITrademarkRecord) {
        Object.assign(trademark, row);
        dialogFormVisible.value = true;
    }

    async function deleteTrademark(id: number) {
        let result = await requestDeleteTrademark(id);
        if (result.code === 200) {
            ElMessage.success('删除品牌成功');
            getHadTrademark();
        }
        else {
            ElMessage.error('删除品牌失败');
        }
    }
</script>

<style scoped></style>