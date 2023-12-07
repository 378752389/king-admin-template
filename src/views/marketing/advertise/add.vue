<script setup>
import AdvertiseDetail from "@/views/marketing/advertise/components/AdvertiseDetail.vue";
import {reactive} from "vue";
import {addAdvertiseApi} from "@/api/marketing/advertise";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

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

const router = useRouter()

const handleSubmit = async () => {
  console.log("advertiseModel", advertiseModel)
  const resp = await addAdvertiseApi(advertiseModel)
  if (resp && resp.message) {
    ElMessage.success(resp.message)
    router.back()
  }
}
</script>

<template>
  <AdvertiseDetail :add-flag="true"
                   @on-submit="handleSubmit"
                   :model-value="advertiseModel"/>
</template>

<style scoped>

</style>