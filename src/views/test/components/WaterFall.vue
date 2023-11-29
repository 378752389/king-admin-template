<script setup>
defineProps({
  columns: {
    type: Number,
    default: 3
  },
  width: {
    type: Number,
    default: 400
  }
})
</script>

<template>
  <div class="water-full">
    <slot :width="width" :columns="columns"></slot>
  </div>
</template>

<style scoped>

</style>