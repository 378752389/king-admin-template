<script setup>
import ProductDetail from "@/views/content/product/components/ProductDetail.vue";
import {reactive, onMounted} from "vue";
import {getProductDetailApi, updateProductApi} from "@/api/content/product";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import router from "@/router";

const productModel = reactive({
  id: "",
  name: "",
  pic: "",
  price: "",
  publish: "",
  categoryId: "",
  categoryName: "",
  description: "",
  plowStock: "",
  stock: 0,
  sale: "",
  lockStock: 0,
  extra: "",
})

const route = useRoute()

onMounted(async () => {
  const id = route.query.id
  try {
    const resp = await getProductDetailApi(id)
    if (resp && resp.code === 200) {
      let data = resp.data
      productModel.id = data.id
      productModel.name = data.name
      productModel.pic = data.pic
      productModel.price = data.price
      productModel.publish = data.publish
      productModel.categoryId = data.categoryId
      productModel.categoryName = data.categoryName
      productModel.description = data.description
      productModel.lowStock = data.lowStock
      productModel.stock = data.stock
      productModel.sale = data.sale
      productModel.extra = data.extra
    }
  } catch (e) {
    ElMessage.error(e.message)
  }
})

const onsubmit = async () => {
  try {
    const resp = await updateProductApi(productModel)
    if (resp && resp.code === 200) {
      ElMessage.success(resp.message)
    }
    router.back()
  } catch (e) {
    ElMessage.error(e.message)
  }
}
</script>

<template>
  <ProductDetail :add-flag="false"
                 @on-submit="onsubmit"
                 v-model="productModel"/>
</template>

<style scoped>

</style>