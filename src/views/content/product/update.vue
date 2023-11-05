<script setup>
import ProductDetail from "@/views/content/product/components/ProductDetail.vue";
import {reactive, onMounted} from "vue";
import {getProductDetailApi} from "@/api/content/product";
import {useRoute} from "vue-router";

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
})
</script>

<template>
  <ProductDetail :add-flag="false" v-model="productModel"/>
</template>

<style scoped>

</style>