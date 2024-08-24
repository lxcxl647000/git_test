<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <ScreenTop></ScreenTop>
            </div>
            <div class="bottom"></div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import ScreenTop from './components/ScreenTop.vue';

    let screen = ref();

    onMounted(() => {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    });

    function getScale(w = 1920, h = 1080) {
        let ww = window.innerWidth / w;
        let wh = window.innerHeight / h;
        return ww < wh ? ww : wh;
    }

    window.onresize = () => {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
        background: url(./images/bg.png) no-repeat;
        background-size: cover;

        .screen {
            position: fixed;
            width: 1920px;
            height: 1080px;
            transform-origin: top left;
            left: 50%;
            top: 50%;

            .top {
                width: 100%;
                height: 40px;
            }
        }
    }
</style>