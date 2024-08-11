<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" style="width: 240px;" v-model="categoryStore.c1_id" @change="onChangeC1"
                    :disabled="scene === 0 ? false : true">
                    <el-option v-for="(item, index) in categoryStore.category1_arr" :key="item.id" :label="item.name"
                        :prop="item" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" style="width: 240px;" v-model="categoryStore.c2_id" @change="onChangeC2"
                    :disabled="scene === 0 ? false : true">
                    <el-option v-for="(item, index) in categoryStore.category2_arr" :key="item.id" :label="item.name"
                        :prop="item" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" style="width: 240px;" v-model="categoryStore.c3_id" @change="onChangeC3"
                    :disabled="scene === 0 ? false : true">
                    <el-option v-for="(item, index) in categoryStore.category3_arr" :key="item.id" :label="item.name"
                        :prop="item" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
    import useCategoryStore from '@/store/modules/category';
    import { onMounted } from 'vue';

    defineProps(['scene']);
    let categoryStore = useCategoryStore();

    onMounted(() => {
        categoryStore.getC1();
    });

    function onChangeC1() {
        categoryStore.c2_id = '';
        categoryStore.c3_id = '';
        categoryStore.category3_arr = [];
        categoryStore.attr_arr = [];
        categoryStore.getC2();
    }

    function onChangeC2() {
        categoryStore.c3_id = '';
        categoryStore.attr_arr = [];
        categoryStore.getC3();

    }
    function onChangeC3() {
        categoryStore.getAttr();
    }
</script>

<style scoped></style>