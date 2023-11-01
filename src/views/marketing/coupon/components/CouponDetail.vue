<script setup>

import {ref, reactive, onMounted} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useVModel} from "@vueuse/core";

// ============================== 传参 =======================================
const props = defineProps({
  addFlag: {
    type: Boolean
  },
  modelValue: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])
const modelObj = useVModel(props, 'modelValue', emit)

// ============================== 属性 =======================================

const validateExpireTime = (rule, value, callback) => {
  if (modelObj.effectiveTime > value) {
    callback(new Error("有效期生效时间必须小于失效时间"))
  }
  callback()
}

const couponRules = reactive({
  name: [
    {required: true, message: '优惠券名不能为空', trigger: 'blur'},
  ],
  expireTime: [
    {validator: validateExpireTime, trigger: 'blur'}
  ]
})

const detailFormRef = ref(null)
const router = useRouter()

// ==============================  事件监听 =======================================

const handleSubmit = async () => {
  try {

    const isValid = await detailFormRef.value.validate((valid, fields) => {
      if (!valid) {
        ElMessage.error(Object.values(fields)[0][0].message)
        return valid;
      }
    })
    if (!isValid) return

    emit('onSubmit')
  } catch (e) {
    ElMessage.error(e.message)
  }

}

const handleCancel = () => {
  router.back()
}

// ==============================  方法 =======================================


</script>

<template>
  <div class="coupon-detail-page">

    <el-card class="form-card" shadow="never">
      <el-form
          ref="detailFormRef"
          label-position="right"
          label-width="100px"
          :model="modelObj"
          :rules="couponRules">

        <el-form-item label="广告名称" prop="name">
          <el-input v-model="modelObj.name" style="width: 500px;"/>
        </el-form-item>

        <el-form-item label="使用门槛" prop="thresholdAmount">
          <el-input v-model="modelObj.thresholdAmount" style="width: 300px;">
            <template #prepend>满</template>
            <template #append>元可用</template>
          </el-input>
        </el-form-item>

        <el-form-item label="面额" prop="amount">
          <el-input v-model="modelObj.amount" style="width: 300px;">
            <template #append>元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="每人限领" prop="limitNum">
          <el-input v-model="modelObj.limitNum" style="width: 300px;">
            <template #append>张</template>
          </el-input>
        </el-form-item>

        <el-form-item label="总发行量" prop="releaseNum">
          <el-input v-model="modelObj.releaseNum" style="width: 300px;">
            <template #append>张</template>
          </el-input>
        </el-form-item>

        <el-form-item label="领券日期" prop="enableTime">
          <el-date-picker
              v-model="modelObj.enableTime"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetime"
              placeholder="请选择开始时间"
          />
        </el-form-item>

        <el-form-item label="开始时间" prop="expireTime">
          <el-date-picker
              v-model="modelObj.effectiveTime"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="请选择开始时间"
              style="width: 150px;"
          />

          <span style="margin: 0 20px;">至</span>

          <el-date-picker
              v-model="modelObj.expireTime"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="请选择结束时间"
              style="width: 150px;"
          />
        </el-form-item>
        <el-form-item label="发布状态" prop="publicStatus">
          <el-switch
              active-text="发布"
              inactive-text="取消"
              v-model="modelObj.publicStatus"
          />
        </el-form-item>
        <el-form-item label="优惠券类型" prop="type">
          <el-select
              v-model="modelObj.type">
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" rows="3" v-model="modelObj.remark"/>
        </el-form-item>

        <el-form-item>
          <el-button type="default" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>

</style>