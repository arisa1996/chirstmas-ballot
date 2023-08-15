<template>
    <canvas style="width: 100%; display: block;" ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { createAnimate } from '@/animates'
import { defineProps, ref, onMounted, onUnmounted, reactive } from 'vue'

const props = defineProps({
    value: {
        type: Number
    }
})

const canvas = ref<HTMLCanvasElement>()
const state = reactive({
    animate: null as null | ReturnType<typeof createAnimate>
})

onMounted(() => {
    if (canvas.value) {
        state.animate = createAnimate(canvas.value, props.value)
    }
})

onUnmounted(() => {
    state.animate?.close()
})
</script>
