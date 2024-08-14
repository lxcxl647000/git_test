<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input v-model="spu.spuName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请选择品牌" style="width: 200px;" v-model="spu.tmId">
                <el-option v-for="(item, index) in allTrademark" :key="item.id" :value="item.id"
                    :label="item.tmName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入描述" v-model="spu.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="imgs" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleImgSuccess"
                :before-upload="beforeImgUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select :placeholder="saleAttr_placeHolder" style="width: 200px;" v-model="currentSelectAttr">
                <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id}|${item.name}`"></el-option>
            </el-select>
            <el-button style="margin-left: 10px;" type="primary" size="default" @click="addSaleAttr" icon="Plus"
                :disabled="currentSelectAttr ? false : true">添加属性</el-button>
            <el-table border style="margin: 10px 0px;" :data="saleAttr">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable
                            :disable-transitions="false" @close="handleClose(tag, row)" style="margin-right: 5px;">
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <el-input placeholder="请输入属性值" v-if="row.inputVisible" ref="InputRef" v-model="inputValue"
                            size="small" style="width: 120px;" @keyup.enter="handleInputConfirm(row)"
                            @blur="handleInputConfirm(row)" />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">
                            +
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="deleteSaleAttr($index)"
                            icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save"
                :disabled="saleAttr.length ? false : true">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>

</template>

<script setup lang="ts">
    import { requestSpuAdd, requestSpuAllSaleAttr, requestSpuEdit, requestSpuImgList, requestSpuSaleAttrList } from '@/api/product/spu';
    import type { ISpuAllSaleAttr, ISpuImg, ISpuRecord, ISpuSaleAttr, ISpuSaleAttrValue } from '@/api/product/spu/type';
    import { requestTrademarkList } from '@/api/product/trademark';
    import type { ITrademarkRecord } from '@/api/product/trademark/type';
    import { computed, nextTick, reactive, ref } from 'vue';
    import { ElInput, ElMessage, type UploadProps } from 'element-plus'
    import useCategoryStore from '@/store/modules/category';

    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);

    const InputRef = ref<InstanceType<typeof ElInput>>();
    const inputValue = ref('');

    let $emit = defineEmits(['changeScene']);

    let categoryStore = useCategoryStore();

    let spu = reactive<ISpuRecord>({
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: [],
        spuImageList: []
    });
    let allTrademark = ref<ITrademarkRecord[]>([]);
    let allSaleAttr = ref<ISpuAllSaleAttr[]>([]);
    let imgs = ref<ISpuImg[]>([]);
    let saleAttr = ref<ISpuSaleAttr[]>([]);

    let currentSelectAttr = ref<string>('');

    // 未选择的属性//
    let unSelectSaleAttr = computed(() => {
        let arr = allSaleAttr.value.filter(item => {
            return saleAttr.value.every(item1 => item.name != item1.saleAttrName);
        });
        return arr;
    });

    let saleAttr_placeHolder = computed(() => {
        let str = unSelectSaleAttr.value.length ? `还有${unSelectSaleAttr.value.length}个可选` : '无';
        return str;
    });

    function cancel() {
        changeScene(0, false);
    }

    function changeScene(scene: number, refresh: boolean, page?: number) {
        clearData();
        $emit('changeScene', { sc: scene, refresh, page });
    }

    async function save() {
        rebuildSpuData();
        let isEdit = spu.id != undefined;
        let result = isEdit ? await requestSpuEdit(spu) : await requestSpuAdd(spu);
        if (result.code === 200) {
            ElMessage.success(isEdit ? '修改成功' : '添加成功');
            let page = isEdit ? undefined : 1;
            changeScene(0, true, page);
        }
        else {
            ElMessage.error(isEdit ? '修改失败' : '添加失败');
        }
    }

    function rebuildSpuData() {
        spu.spuSaleAttrList = saleAttr.value;
        spu.spuImageList = imgs.value.map(item => {
            return {
                imgName: item.name,
                imgUrl: item.url
            }
        });
    }

    function clearData() {
        allTrademark.value = [];
        allSaleAttr.value = [];
        imgs.value = [];
        saleAttr.value = [];
        currentSelectAttr.value = '';
        delete spu.id;
    }

    async function setSpu(data: ISpuRecord | null) {
        clearData();
        // 深拷贝数据//
        Object.assign(spu, data ? JSON.parse(JSON.stringify(data)) : {
            spuName: '',
            description: '',
            category3Id: categoryStore.c3_id,
            tmId: '',
            spuSaleAttrList: [],
            spuImageList: []
        });
        // 获取所有品牌列表//
        let trademarkResult = await requestTrademarkList();
        // 获取所有的销售属性//
        let allSaleAttrResult = await requestSpuAllSaleAttr();
        if (trademarkResult.code === 200) {
            allTrademark.value = trademarkResult.data;
        }
        if (allSaleAttrResult.code === 200) {
            allSaleAttr.value = allSaleAttrResult.data;
        }

        if (spu.id) {// 修改spu//
            //  获取照片墙//
            let imgsResult = await requestSpuImgList(spu.id);
            // 获取该spu的销售属性列表//
            let saleAttrResult = await requestSpuSaleAttrList(spu.id);

            if (imgsResult.code === 200) {
                imgs.value = imgsResult.data.map(item => {
                    return {
                        name: item.imgName,
                        url: item.imgUrl
                    };
                });
            }
            if (saleAttrResult.code === 200) {
                saleAttr.value = saleAttrResult.data;
            }
        }
    }

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles);
    }

    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
        dialogImageUrl.value = uploadFile.url!;
        dialogVisible.value = true;
    }

    // 上传图片之前的钩子 限制格式和大小//
    const beforeImgUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
            ElMessage.error('上传图片的格式必须为jpg、png、gif');
            return false;
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('上传图片的大小不能超过2M');
            return false;
        }
        return true;
    }

    // 上传图片成功的钩子//
    const handleImgSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        // response为上传图片请求返回的数据//
        imgs.value[imgs.value.length - 1].url = response.data;
    }

    const handleClose = (tag: ISpuSaleAttrValue, row: ISpuSaleAttr) => {
        row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
    }

    const showInput = (row: ISpuSaleAttr) => {
        row.inputVisible = true;
        nextTick(() => {
            InputRef.value!.input!.focus();
        })
    }

    const handleInputConfirm = (row: ISpuSaleAttr) => {
        let str = inputValue.value.trim();
        if (str) {
            let isSame = row.spuSaleAttrValueList.find(item => item.saleAttrValueName === str);
            if (isSame) {
                ElMessage.error('属性值不能重复');
                return;
            }
            row.spuSaleAttrValueList.push({
                baseSaleAttrId: row.baseSaleAttrId,
                saleAttrValueName: inputValue.value,
                saleAttrName: row.saleAttrName
            });
        }
        row.inputVisible = false;
        inputValue.value = '';
    }

    function deleteSaleAttr($index: number) {
        saleAttr.value.splice($index, 1);
    }

    function addSaleAttr() {
        if (!currentSelectAttr.value) {
            return;
        }
        let [baseSaleAttrId, saleAttrName] = currentSelectAttr.value.split('|');
        saleAttr.value.push({
            baseSaleAttrId: +baseSaleAttrId,
            saleAttrName: saleAttrName,
            spuSaleAttrValueList: []
        });
        currentSelectAttr.value = '';
    }

    // 暴露出去给父组件调用//
    defineExpose({ setSpu });
</script>

<style scoped></style>