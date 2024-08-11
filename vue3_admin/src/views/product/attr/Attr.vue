<template>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
        <div v-show="scene === 0">
            <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3_id ? false : true"
                @click="addAttr">
                添加属性
            </el-button>
            <el-table border style="margin: 10px 0px;" :data="categoryStore.attr_arr">
                <el-table-column label="序号" width="80" type="index" align="center" />
                <el-table-column label="属性名称" width="120" prop="attrName" />
                <el-table-column label="属性值名称">
                    <template #="{ row }">
                        <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="editAttr(row)"></el-button>
                        <el-popconfirm :title="`确认删除${row.attrName}?`" @confirm="confirmDelete(row.id)" width="200px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene === 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名称" v-model="saveAttrInfo.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="default" icon="Plus" @click="addAttrValue"
                :disabled="saveAttrInfo.attrName ? false : true">添加属性值</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-table border style="margin: 10px 0px;" :data="saveAttrInfo.attrValueList">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row, $index }">
                        <el-input :ref="(el: any) => inputArr[$index] = el" v-if="row.flag" placeholder="请输入属性值名称"
                            v-model="row.valueName" @blur="onBlur(row, $index)"></el-input>
                        <div v-else @click="clickAttrValueName(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="deleteAttrValue(row, $index)"
                            icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" size="default" @click="save"
                :disabled="saveAttrInfo.attrValueList.length > 0 ? false : true">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
    import { requestDelAttr, requestSaveAttr } from '@/api/product/attr';
    import type { IAttrData, IAttrValue } from '@/api/product/attr/type';
    import useCategoryStore from '@/store/modules/category';
    import { ElMessage } from 'element-plus';
    import { nextTick, onBeforeUnmount, reactive, ref } from 'vue';

    let categoryStore = useCategoryStore();
    // 控制属性表格和编辑添加属性的切换//
    let scene = ref<number>(0);
    // 收集新增或修改的属性值数据//
    let saveAttrInfo = reactive<IAttrData>({
        attrName: '',
        categoryId: 0,
        categoryLevel: 3,
        attrValueList: []
    });
    // 记录添加属性值的elinput输入框//
    let inputArr = ref<any>([]);

    // 路由组件销毁时 清空仓库相关数据//
    onBeforeUnmount(() => {
        categoryStore.$reset();
    });

    function setSaveAttrInfo(data?: IAttrData) {
        data = data ? JSON.parse(JSON.stringify(data)) : {
            attrName: '',
            categoryId: categoryStore.c3_id,
            categoryLevel: 3,
            attrValueList: []
        }
        Object.assign(saveAttrInfo, data);
    }

    function addAttr() {
        scene.value = 1;
        setSaveAttrInfo();
    }

    function editAttr(row: IAttrData) {
        setSaveAttrInfo(row);
        scene.value = 1;
    }

    function cancel() {
        scene.value = 0;
    }

    async function save() {
        let result = await requestSaveAttr(saveAttrInfo);
        if (result.code === 200) {
            ElMessage.success(saveAttrInfo.id ? '修改成功' : '添加成功');
            scene.value = 0;
            categoryStore.getAttr();
        }
        else {
            ElMessage.error(saveAttrInfo.id ? '修改失败' : '添加失败');
        }
    }

    function addAttrValue() {
        let length = saveAttrInfo.attrValueList.length;
        if (length > 0 && !saveAttrInfo.attrValueList[length - 1].valueName) {
            ElMessage.error('请输入属性值名称');
            return;
        }
        saveAttrInfo.attrValueList.push({
            valueName: '',
            flag: true
        });

        nextTick(() => {
            inputArr.value[saveAttrInfo.attrValueList.length - 1].focus();
        });
    }

    function onBlur(row: IAttrValue, $index: number) {
        if (!row.valueName.trim()) {
            ElMessage.error('属性值名称不能为空');
            saveAttrInfo.attrValueList.splice($index, 1);
            return;
        }
        let sameName = saveAttrInfo.attrValueList.find((item) => {
            if (item !== row) {
                return item.valueName === row.valueName;
            }
        });
        if (sameName) {
            ElMessage.error('属性值名称不能重复');
            saveAttrInfo.attrValueList.splice($index, 1);
            return;
        }
        row.flag = false;
    }

    function clickAttrValueName(row: IAttrValue, $index: number) {
        row.flag = true;

        nextTick(() => {
            inputArr.value[$index].focus();
        });
    }

    function deleteAttrValue(row: IAttrValue, $index: number) {
        saveAttrInfo.attrValueList.splice($index, 1);
    }

    async function confirmDelete(attrID: number) {
        let result = await requestDelAttr(attrID);
        if (result.code === 200) {
            categoryStore.getAttr();
            ElMessage.success('删除成功');
        }
        else {
            ElMessage.error('删除失败');
        }
    }
</script>

<style scoped></style>