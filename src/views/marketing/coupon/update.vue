<script setup>

import CouponDetail from "@/views/marketing/coupon/components/CouponDetail.vue";
import {reactive, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useRouter, useRoute} from "vue-router";
import {getCouponDetailApi, updateCouponApi} from "@/api/marketing/coupon";

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
    const resp = await updateCouponApi(couponModel)
    if (resp && resp.code === 200) {
      ElMessage.success(resp.message)
      await router.push({
        name: 'coupon'
      })
    }
  } catch (e) {
    ElMessage.error(e.message)
  }
}

onMounted(async () => {
  const route = useRoute()
  const id = route.query.id
  const resp = await getCouponDetailApi(id)
  if (resp && resp.code === 200) {
    let data = resp.data

    couponModel.id = data.id
    couponModel.name = data.name
    couponModel.type = data.type
    couponModel.releaseNum = data.releaseNum
    couponModel.limitNum = data.limitNum
    couponModel.amount = data.amount
    couponModel.enableTime = data.enableTime
    couponModel.thresholdAmount = data.thresholdAmount
    couponModel.effectiveTime = data.effectiveTime
    couponModel.expireTime = data.expireTime
    couponModel.remark = data.remark

  } else {
    ElMessage.warning(resp.message)
  }
})

</script>

<template>
  <CouponDetail :add-flag="false"
                @onSubmit="handleSubmit"
                v-model="couponModel"/>
</template>

<style scoped>

</style>