<template>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
        <!-- 已有spu展示 -->
        <div v-show="scene === 0">
            <el-button type="primary" size="default" @click="editSpu(null)" icon="Plus"
                :disabled="categoryStore.c3_id ? false : true">添加SPU</el-button>
            <el-table border style="margin: 10px 0px;" :data="spuRecords">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="addSku" icon="Plus" title="添加SKU"></el-button>
                        <el-button type="warning" size="small" @click="editSpu(row)" icon="Edit"
                            title="修改SPU"></el-button>
                        <el-button type="info" size="small" @click="" icon="InfoFilled" title="查看SKU列表"></el-button>
                        <el-button type="danger" size="small" @click="" icon="Delete" title="删除SPU"></el-button>
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
        <SkuEdit ref="skuComponent" v-show="scene === 2"></SkuEdit>
    </el-card>

</template>

<script setup lang="ts">
    import { requestSpuRecords } from '@/api/product/spu';
    import type { ISpuRecord } from '@/api/product/spu/type';
    import useCategoryStore from '@/store/modules/category';
    import { nextTick, ref, watch } from 'vue';
    import SpuEdit from '@/components/SpuEdit.vue';
    import SkuEdit from '@/components/SkuEdit.vue';

    let categoryStore = useCategoryStore();
    // 0:显示已有spu 1：显示添加或修改spu 2：显示添加sku//
    let scene = ref<number>(0);
    let pageSize = ref<number>(3);
    let totalNum = ref<number>(0);
    let currentPage = ref<number>(1);

    let spuRecords = ref<ISpuRecord[]>([]);
    let spuComponent = ref();

    watch(() => categoryStore.c3_id, () => {
        spuRecords.value = [];
        if (!categoryStore.c3_id) {
            return;
        }
        currentPage.value = 1;
        getSpuRecords();
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

    function addSku() {
        changeScene({ sc: 2 });
    }

    // 子组件切换场景的事件//
    function changeScene(param: { sc: number, refresh?: boolean, page?: number }) {
        scene.value = param.sc;
        param.refresh && getSpuRecords(param.page);
    }
</script>

<style scoped></style>