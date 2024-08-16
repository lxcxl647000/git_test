<template>
    <el-form label-width="100px">
        <el-form-item label="sku名称">
            <el-input placeholder="sku名称" v-model="skuData.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuData.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" v-model="skuData.weight"></el-input>
        </el-form-item>
        <el-form-item label="sku描述">
            <el-input placeholder="sku描述" type="textarea" v-model="skuData.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName"
                    style="margin: 5px 0px;">
                    <el-select placeholder="请选择" style="width: 200px;" v-model="skuData.skuAttrValueList[index]"
                        value-key="valueId">
                        <el-option v-for="(item1, index) in item.attrValueList" :key="item1.id" :label="item1.valueName"
                            :value="{ attrId: item1.attrId, valueId: item1.id }"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="(item, index) in saleAttr" :key="item.id" :label="item.saleAttrName"
                    style="margin: 5px 5px;">
                    <el-select placeholder="请选择" style="width: 200px;" v-model="skuData.skuSaleAttrValueList[index]"
                        value-key="saleAttrValueId">
                        <el-option v-for="item1 in item.spuSaleAttrValueList" :key="item1.id"
                            :label="item1.saleAttrValueName"
                            :value="{ saleAttrId: item1.baseSaleAttrId, saleAttrValueId: item1.id }"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgs" ref="imgTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <el-image :src="row.imgUrl" :lazy="true" style="width: 100px;"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button v-if="skuData.skuDefaultImg !== row.imgUrl" type="warning" size="small"
                            @click="onDefaultImg(row)">设置默认</el-button>
                        <el-button v-if="skuData.skuDefaultImg === row.imgUrl" type="primary" size="small"
                            @click="">默认图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
    import { requestAttr } from '@/api/product/attr';
    import type { IAttrData } from '@/api/product/attr/type';
    import { requestSkuAdd, requestSpuImgList, requestSpuSaleAttrList } from '@/api/product/spu';
    import type { ISkuData, ISpuImg, ISpuRecord, ISpuSaleAttr } from '@/api/product/spu/type';
    import useCategoryStore from '@/store/modules/category';
    import { ElMessage } from 'element-plus';
    import { reactive, ref } from 'vue';

    let $emit = defineEmits(['changeScene']);

    let categoryStore = useCategoryStore();

    let attrArr = ref<IAttrData[]>([]);
    let imgs = ref<ISpuImg[]>([]);
    let saleAttr = ref<ISpuSaleAttr[]>([]);
    let skuData = reactive<ISkuData>({
        category3Id: '',
        spuId: 0,
        tmId: 0,
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
    });
    let imgTable = ref();

    function changeScene(scene: number, refresh: boolean, page?: number) {
        clearData();
        $emit('changeScene', { sc: scene, refresh, page });
    }

    function clearData() {
        attrArr.value = [];
        imgs.value = [];
        saleAttr.value = [];
        Object.assign(skuData, {
            category3Id: '',
            spuId: 0,
            tmId: 0,
            skuName: '',
            price: '',
            weight: '',
            skuDesc: '',
            skuAttrValueList: [],
            skuSaleAttrValueList: [],
            skuDefaultImg: ''
        });
    }

    function cancel() {
        changeScene(0, false);
    }

    async function save() {
        rebuildSkuData();
        let result = await requestSkuAdd(skuData);
        if (result.code === 200) {
            ElMessage.success('添加成功');
            changeScene(0, false);
        }
        else {
            ElMessage.error('添加失败');
        }
    }

    function rebuildSkuData() {
        skuData.skuAttrValueList = skuData.skuAttrValueList.filter(item => item !== undefined);
        skuData.skuSaleAttrValueList = skuData.skuSaleAttrValueList.filter(item => item !== undefined);
    }

    async function initData(spu: ISpuRecord) {
        skuData.category3Id = categoryStore.c3_id;
        skuData.tmId = spu.tmId;
        skuData.spuId = spu.id!;
        // 获取属性列表//
        let result = await requestAttr(categoryStore.c1_id, categoryStore.c2_id, categoryStore.c3_id);
        //  获取照片墙//
        let imgsResult = await requestSpuImgList(spu.id!);
        // 获取该spu的销售属性列表//
        let saleAttrResult = await requestSpuSaleAttrList(spu.id!);

        if (result.code === 200) {
            attrArr.value = result.data;
        }
        if (imgsResult.code === 200) {
            imgs.value = imgsResult.data;
        }
        if (saleAttrResult.code === 200) {
            saleAttr.value = saleAttrResult.data;
        }
    }

    function onDefaultImg(row: ISpuImg) {
        imgs.value.forEach(item => imgTable.value.toggleRowSelection(item, false));
        imgTable.value.toggleRowSelection(row, true);
        skuData.skuDefaultImg = row.imgUrl!;
    }

    function handleSelectionChange(val: ISpuImg[]) {
        if (val.length === 0) {
            imgs.value.forEach(item => imgTable.value.toggleRowSelection(item, false));
            skuData.skuDefaultImg = '';
        }
    }

    defineExpose({ initData });
</script>

<style scoped></style>