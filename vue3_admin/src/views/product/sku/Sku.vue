<template>
    <el-card>
        <el-table border :data="skuList">
            <el-table-column label="序号" align="center" width="100px" type="index"></el-table-column>
            <el-table-column label="名称" width="200px" prop="skuName"></el-table-column>
            <el-table-column label="图片" width="200px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" width="100px">
                </template>
            </el-table-column>
            <el-table-column label="描述" width="200px" prop="skuDesc"></el-table-column>
            <el-table-column label="重量" width="200px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="200px" prop="price"></el-table-column>
            <el-table-column label="操作" width="350px" fixed="right">
                <template #="{ row, $index }">
                    <el-button :type="row.isSale === 0 ? 'success' : 'info'" size="small" @click="onSaleChange(row)"
                        :icon="row.isSale === 0 ? 'Top' : 'Bottom'" v-btnPermission="`btn.Sku.updown`"></el-button>
                    <el-button type="primary" size="small" @click="editSku" icon="Edit"
                        v-btnPermission="`btn.Sku.update`"></el-button>
                    <el-button type="info" size="small" @click="checkSkuInfo(row)" icon="InfoFilled"
                        v-btnPermission="`btn.Sku.detail`"></el-button>
                    <el-popconfirm :title="`确认删除${row.skuName}?`" @confirm="removeSku(row)" width="200px">
                        <template #reference>
                            <el-button type="danger" size="small" @click="" icon="Delete"
                                v-btnPermission="`btn.Sku.remove`"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 10px;" v-model:current-page="currentPage" :page-sizes="[10, 30, 50, 70]"
            v-model:page-size="pageSize" layout="prev, pager, next, jumper,->,sizes,total" :total="totalNum" background
            @change="getSkuList">
        </el-pagination>
        <!-- 抽屉组件显示sku详情 -->
        <el-drawer v-model="drawer" direction="rtl">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ sku.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ sku.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ sku.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 0px 5px;" v-for="(item, index) in sku.skuAttrValueList"
                            :key="item.valueId" type="primary">{{
                                item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 0px 5px;" v-for="(item, index) in sku.skuSaleAttrValueList"
                            :key="item.saleAttrValueId" type="primary">{{
                                item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">商品照片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="2000" type="card" height="200px">
                            <el-carousel-item v-for="item in sku.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
    import { requestCancelSale, requestGetSkuByID, requestOnSale, requestRemove, requestSkuListByPage } from '@/api/product/sku';
    import type { ISkuData } from '@/api/product/spu/type';
    import { ElMessage } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';

    let totalNum = ref<number>(0);
    let currentPage = ref<number>(1);
    let pageSize = ref<number>(10);

    let skuList = ref<ISkuData[]>([]);

    let drawer = ref(false);
    let sku = reactive<ISkuData>({
        category3Id: '',
        spuId: 0,
        tmId: '',
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
    });

    let scene = ref(0);
    let skuComponent = ref();

    onMounted(() => {
        getSkuList();
    });

    async function getSkuList() {
        let result = await requestSkuListByPage(currentPage.value, pageSize.value);
        if (result.code === 200) {
            skuList.value = result.data.records;
            totalNum.value = result.data.total;
        }
    }

    async function onSaleChange(row: ISkuData) {
        let isOnSale = row.isSale === 1;
        let result = isOnSale ? await requestCancelSale(row.id!) : await requestOnSale(row.id!);
        let msg = '';
        if (result.code === 200) {
            row.isSale = isOnSale ? 0 : 1;
            msg = row.isSale === 1 ? '上架成功' : '下架成功';
            ElMessage.success(msg);
        }
        else {
            msg = row.isSale === 0 ? '上架失败' : '下架失败';
            ElMessage.error(msg);
        }
    }

    async function removeSku(row: ISkuData) {
        let result = await requestRemove(row.id!);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            getSkuList();
        }
    }

    async function checkSkuInfo(row: ISkuData) {
        let result = await requestGetSkuByID(row.id!);
        if (result.code === 200) {
            Object.assign(sku, result.data);
            drawer.value = true;
        }
    }

    function editSku() {
        ElMessage.success('正在开发中');
    }
</script>

<style scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>