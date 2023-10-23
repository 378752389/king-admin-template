<script setup>

import PackageDetail from "@/views/content/package/components/PackageDetail.vue";
import {ref} from 'vue';

const packageModel = ref({
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
  console.log(packageModel)
}
</script>

<template>
  <PackageDetail :add-flag="true" @onSubmit="onSubmit" v-model="packageModel"/>
</template>

<style scoped>

</style>