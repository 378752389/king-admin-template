<script setup>
import ProductDetail from "@/views/content/product/components/ProductDetail.vue";
import {reactive, onMounted} from "vue";

const productModel = reactive({

})

onMounted(() => {

})
</script>

<template>
  <ProductDetail :add-flag="false"  v-model="productModel" />
</template>

<style scoped>

</style>