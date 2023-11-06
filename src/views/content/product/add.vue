<script setup>
import ProductDetail from "@/views/content/product/components/ProductDetail.vue";
import {reactive, onMounted} from "vue";
import {addProductApi} from "@/api/content/product";
import {ElMessage} from "element-plus";
import router from "@/router";

const productModel = reactive({})

const onsubmit = async () => {
  try {
    const resp = await addProductApi(productModel)
    if (resp && resp.code === 200) {
      ElMessage.success(resp.message)
    }
    router.back()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

onMounted(() => {

})
</script>

<template>
  <ProductDetail :add-flag="true" @on-submit="onsubmit" v-model="productModel"/>
</template>

<style scoped>

</style>