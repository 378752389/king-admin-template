<script setup>

import CouponDetail from "@/views/marketing/coupon/components/CouponDetail.vue";
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {addCouponApi} from "@/api/marketing/coupon";

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
    const resp = await addCouponApi(couponModel)
    if (resp && resp.code === 200) {
      ElMessage.success(resp.message)
      await router.push({
        name: 'coupon'
      })
    } else {
      ElMessage.warning(resp.message)
    }

  } catch (e) {
    ElMessage.error(e.message)
  }
}
</script>

<template>
  <CouponDetail :add-flag="true"
                @onSubmit="handleSubmit"
                v-model="couponModel"/>
</template>

<style scoped>

</style>