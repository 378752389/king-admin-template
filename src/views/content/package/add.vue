<script setup>

import PackageDetail from "@/views/content/package/components/PackageDetail.vue";
import {reactive} from 'vue';
import {addPackageApi} from "@/api/content/package";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const packageModel = reactive({
  categoryId: '',
  name: '',
  description: '',
  publish: 0,
  sort: 0,
  promotionPrice: 0,
  pic: '',
  type: '',
  lowStock: 0,
  productIds: []
})

const router = useRouter()

const onSubmit = async () => {
  const resp = await addPackageApi(packageModel)
  if (resp && resp.code === 200) {
    ElMessage.success(resp.message)
    router.back()
  }
}
</script>

<template>
  <PackageDetail :add-flag="true" @onSubmit="onSubmit" v-model="packageModel"/>
</template>

<style scoped>

</style>