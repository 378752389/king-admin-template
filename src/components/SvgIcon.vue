<script setup>
const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-icon>
    <component :is="props.icon" />
  </el-icon>
</template>

<style scoped>

</style>