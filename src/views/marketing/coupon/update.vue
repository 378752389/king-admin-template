<script setup>

import CouponDetail from "@/views/marketing/coupon/components/CouponDetail.vue";
import {reactive, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

// -------实体对象--------
const couponModel = reactive({
  id: 0,
  name: '',
  type: '',
  releaseNum: '',
  limitNum: '',
  amount: '',
  enableTime: '',
  thresholdAmount: '',
  effectiveTime: '',
  expireTime: '',
  remark: ''
})

const router = useRouter()

const handleSubmit = async () => {
  try {
    // todo changeApi
    const resp = await new Promise(resolve => {
      setTimeout(() => {
        resolve({code: 200, message: '提交成功', data: {...couponModel}})
      }, 1000)
    })

    ElMessage.success(resp.message)
    await router.push({
      name: 'coupon'
    })
  } catch (e) {
    ElMessage.error(e.message)
  }
}

onMounted(() => {

})

</script>

<template>
  <CouponDetail :add-flag="false"
                @onSubmit="handleSubmit"
                v-model="couponModel"/>
</template>

<style scoped>

</style>