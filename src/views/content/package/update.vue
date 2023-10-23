<script setup>

import PackageDetail from "@/views/content/package/components/PackageDetail.vue";
import {reactive, onMounted} from 'vue';
import {useRoute} from "vue-router";

const route = useRoute()

const packageModel = reactive({
  categoryId: 1,
  name: '巨无霸',
  description: '',
  publish: 0,
  sort: 2,
  price: 28,
  pic: '',
  productIds: [1, 2, 3]
})

const onSubmit = () => {
  // 修改表单回调
  console.log(packageModel)
  // todo 根据表单，提交数据
}

onMounted(() => {
  const id = route.query.id;
  console.log(id)
  // todo 根据id 加载数据
})

</script>

<template>
  <PackageDetail :add-flag="false" @onSubmit="onSubmit" v-model="packageModel"/>
</template>

<style scoped>

</style>