<template>
    <svg :style="{ width: width, height: height }">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts" name="SvgIcon">
    defineProps({
        prefix: {
            type: String,
            default: '#icon-'
        },
        name: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '16px'
        },
        height: {
            type: String,
            default: '16px'
        },
    });
</script>

<style scoped></style>