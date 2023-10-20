<script setup>
import TestCard from "@/views/test/components/TestCard.vue";
import {ref, watch} from 'vue';

const checkData = ref([]);

watch(checkData, (n) => {
  console.log("父组件中获取的新值", n)
})
</script>

<template>
  <TestCard v-model="checkData"/>
</template>

<style scoped>

</style>