<template>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
        <!-- 已有spu展示 -->
        <div v-show="scene === 0">
            <el-button type="primary" size="default" @click="editSpu(null)" icon="Plus"
                :disabled="categoryStore.c3_id ? false : true" v-btnPermission="`btn.Spu.add`">添加SPU</el-button>
            <el-table border style="margin: 10px 0px;" :data="spuRecords">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="addSku(row)" icon="Plus" title="添加SKU"
                            v-btnPermission="`btn.Spu.addsku`"></el-button>
                        <el-button type="warning" size="small" @click="editSpu(row)" icon="Edit" title="修改SPU"
                            v-btnPermission="`btn.Spu.update`"></el-button>
                        <el-button type="info" size="small" @click="checkSkuList(row)" icon="InfoFilled" title="查看SKU列表"
                            v-btnPermission="`btn.Spu.skus`"></el-button>
                        <el-popconfirm :title="`确认删除${row.spuName}?`" @confirm="spuRemove(row)" width="200px">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" title="删除SPU"
                                    v-btnPermission="`btn.Spu.delete`"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" :page-sizes="[3, 5, 7, 9]" v-model:page-size="pageSize"
                layout="prev, pager, next, jumper,->,sizes,total" :total="totalNum" background @change="getSpuRecords">
            </el-pagination>
        </div>
        <!-- 添加或修改spu -->
        <SpuEdit ref="spuComponent" v-show="scene === 1" @changeScene="changeScene"></SpuEdit>
        <!-- 添加sku -->
        <SkuEdit ref="skuComponent" v-show="scene === 2" @changeScene="changeScene"></SkuEdit>
        <!-- 显示sku列表的对话框 -->
        <el-dialog v-model="showSkuList" title="SKU列表">
            <el-table :data="skuList" border>
                <el-table-column label="sku名称" prop="skuName"></el-table-column>
                <el-table-column label="sku价格" prop="price"></el-table-column>
                <el-table-column label="sku重量" prop="weight"></el-table-column>
                <el-table-column label="sku图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts">
    import { requestSkuList, requestSpuRecords, requestSpuRemove } from '@/api/product/spu';
    import type { ISkuData, ISpuRecord } from '@/api/product/spu/type';
    import useCategoryStore from '@/store/modules/category';
    import { onBeforeUnmount, ref, watch } from 'vue';
    import SpuEdit from '@/components/SpuEdit.vue';
    import SkuEdit from '@/components/SkuEdit.vue';
    import { ElMessage } from 'element-plus';

    let categoryStore = useCategoryStore();
    // 0:显示已有spu 1：显示添加或修改spu 2：显示添加sku//
    let scene = ref<number>(0);
    let pageSize = ref<number>(3);
    let totalNum = ref<number>(0);
    let currentPage = ref<number>(1);

    let spuRecords = ref<ISpuRecord[]>([]);
    let spuComponent = ref();
    let skuComponent = ref();

    let showSkuList = ref(false);
    let skuList = ref<ISkuData[]>([]);

    watch(() => categoryStore.c3_id, () => {
        spuRecords.value = [];
        if (!categoryStore.c3_id) {
            return;
        }
        currentPage.value = 1;
        getSpuRecords();
    });

    // 路由组件销毁时 清空仓库相关数据//
    onBeforeUnmount(() => {
        categoryStore.$reset();
    });

    async function getSpuRecords(page?: number) {
        if (page) {
            currentPage.value = page;
        }
        let result = await requestSpuRecords(currentPage.value, pageSize.value, categoryStore.c3_id);
        if (result.code === 200) {
            spuRecords.value = result.data.records;
            totalNum.value = result.data.total;
        }
    }

    function editSpu(data: ISpuRecord | null) {
        spuComponent.value.setSpu(data);
        changeScene({ sc: 1 });
    }

    function addSku(row: ISpuRecord) {
        skuComponent.value.initData(row);
        changeScene({ sc: 2 });
    }

    // 子组件切换场景的事件//
    function changeScene(param: { sc: number, refresh?: boolean, page?: number }) {
        scene.value = param.sc;
        param.refresh && getSpuRecords(param.page);
    }

    async function checkSkuList(row: ISpuRecord) {
        let result = await requestSkuList(row.id!);
        if (result.code === 200) {
            skuList.value = result.data;
            showSkuList.value = true;
        }
    }

    async function spuRemove(row: ISpuRecord) {
        let result = await requestSpuRemove(row.id!);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            getSpuRecords();
        }
        else {
            ElMessage.error('删除失败');
        }
    }
</script>

<style scoped></style>