<script setup>
import {reactive, onMounted} from "vue";
import {getOrderSettingApi, updateOrderSettingApi} from "@/api/order/setting";
import {ElMessage} from "element-plus";

const modelObj = reactive({
  orderTimeout: undefined,
  orderAutoConfirm: undefined,
})

const rules = reactive({
  orderTimeout: [
    {required: true, message: "订单超时时间不能为空", trigger: 'blur'}
  ],
  orderAutoConfirm: [
    {required: true, message: "订单完成超时时间不能为空", trigger: 'blur'}
  ]
})

const onSubmit = async () => {
  try {
    const resp = await updateOrderSettingApi({...modelObj})
    ElMessage.success(resp.message)
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const loadData = async () => {
  try {
    const resp = await getOrderSettingApi()
    if (resp) {
      modelObj.orderTimeout = resp.data.orderTimeout;
      modelObj.orderAutoConfirm = resp.data.orderAutoConfirm;
    }
  } catch (e) {
    ElMessage.error(e.message)
  }
}

onMounted(async () => {
  await loadData()
})

</script>

<template>
  <div class="setting-page">
    <el-card class="form-card" shadow="never">
      <el-form
          label-width="150px"
          :model="modelObj"
          :rules="rules"
      >
        <el-form-item label="订单超时时间" prop="orderTimeout">
          <el-input v-model="modelObj.orderTimeout" style="width: 500px">
            <template #append>
              分
            </template>
          </el-input>

          <div class="item-tip">未付款，订单自动关闭</div>
        </el-form-item>

        <el-form-item label="订单完成超时时间" prop="orderFinishTimeout">
          <el-input v-model="modelObj.orderAutoConfirm" style="width: 500px">
            <template #append>
              分
            </template>
          </el-input>

          <div class="item-tip">订单完成，自动确认</div>
        </el-form-item>

        <el-form-item>
          <el-button class="submit-btn" size="large" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.item-tip {
  margin-left: 30px;
}
</style>

