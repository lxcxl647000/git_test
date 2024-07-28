import SvgIcon from './components/SvgIcon.vue';
import type { App, Component } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        for (let key in components) {
            app.component(key, components[key]);
        }

        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}