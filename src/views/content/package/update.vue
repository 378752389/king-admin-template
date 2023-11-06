<script setup>

import PackageDetail from "@/views/content/package/components/PackageDetail.vue";
import {reactive, onMounted} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {getPackageDetailApi, updatePackageApi} from "@/api/content/package";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()

const packageModel = reactive({
  id: 0,
  categoryId: 0,
  name: '',
  description: '',
  publish: 0,
  sort: 0,
  price: 0,
  pic: '',
  productIds: []
})

const onSubmit = async () => {
  // 修改表单回调
  const resp = await updatePackageApi(packageModel)
  if (resp && resp.code) {
    ElMessage.success(resp.message)
    router.back()
  }
}


onMounted(async () => {
  const id = route.query.id;
  const resp = await getPackageDetailApi(id)
  if (resp.data) {
    let data = resp.data
    packageModel.id = data.id
    packageModel.categoryId = data.categoryId
    packageModel.name = data.name
    packageModel.description = data.description
    packageModel.publish = data.publish
    packageModel.sort = data.sort
    packageModel.price = data.price
    packageModel.pic = data.pic
    packageModel.productIds = data.productList.map(p => p.id)
  }
})

</script>

<template>
  <PackageDetail :add-flag="false" @onSubmit="onSubmit" v-model="packageModel"/>
</template>

<style scoped>

</style>