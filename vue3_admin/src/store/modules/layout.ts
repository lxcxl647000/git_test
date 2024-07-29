// layout组件相关仓库//
import { defineStore } from "pinia";

let useLayoutStore = defineStore('layoutStore', {
    state: () => {
        return {
            fold: false,// 用于控制菜单折叠与否 true折叠 false展开//
            refresh: false// 改变一次表示刷新一次//
        }
    }
});

export default useLayoutStore;