<script setup>

import AdvertiseDetail from "@/views/marketing/advertise/components/AdvertiseDetail.vue";
import {reactive, onMounted} from "vue";
import {getAdvertiseDetailApi, updateAdvertiseApi} from "@/api/marketing/advertise";
import {ElMessage} from "element-plus";
import {useRouter, useRoute} from "vue-router";

const router = useRouter()
const advertiseModel = reactive({
  id: 0,
  name: '',
  startTime: '',
  endTime: '',
  publish: 0,
  pics: [],
  sort: 0,
  href: '',
  description: ''
})

onMounted(async () => {
  const route = useRoute()
  const id = route.query.id
  const resp = await getAdvertiseDetailApi(id)
  if (resp && resp.data) {
    let data = resp.data
    advertiseModel.id = data.id
    advertiseModel.name = data.name
    advertiseModel.startTime = data.startTime
    advertiseModel.endTime = data.endTime
    advertiseModel.publish = data.publish
    advertiseModel.pics = data.pics
    advertiseModel.sort = data.sort
    advertiseModel.href = data.href
    advertiseModel.description = data.description
  }
})

const handleSubmit = async () => {
  const resp = await updateAdvertiseApi(advertiseModel)
  if (resp && resp.message) {
    ElMessage.success(resp.message)
    router.back()
  }
}


</script>

<template>
  <AdvertiseDetail :add-flag="false"
                   :model-value="advertiseModel"
                   @on-submit="handleSubmit"/>
</template>

<style scoped>

</style>