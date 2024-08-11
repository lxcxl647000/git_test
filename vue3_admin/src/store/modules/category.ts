import { requestAttr, requestC1, requestC2, requestC3, requestSaveAttr } from "@/api/product/attr";
import { defineStore } from "pinia";
import type { ICategoryState } from "./type/types";
import type { IAttrData } from "@/api/product/attr/type";

let useCategoryStore = defineStore('category', {
    state: (): ICategoryState => {
        return {
            category1_arr: [],
            c1_id: '',
            category2_arr: [],
            c2_id: '',
            category3_arr: [],
            c3_id: '',
            attr_arr: [],
        }
    },
    actions: {
        async getC1() {
            let result = await requestC1();
            if (result.code === 200) {
                this.category1_arr = result.data;
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },

        async getC2() {
            let result = await requestC2(this.c1_id);
            if (result.code === 200) {
                this.category2_arr = result.data;
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },

        async getC3() {
            let result = await requestC3(this.c2_id);
            if (result.code === 200) {
                this.category3_arr = result.data;
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },

        async getAttr() {
            let result = await requestAttr(this.c1_id, this.c2_id, this.c3_id);
            if (result.code === 200) {
                this.attr_arr = result.data;
                return 'ok';
            }
            else {
                return Promise.reject(new Error(result.message));
            }
        },
    }
});

export default useCategoryStore;