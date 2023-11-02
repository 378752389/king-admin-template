<script setup>
import {ref, reactive} from "vue";

// 表单规则校验
const rules = reactive({
  id: [],
})

const configModel = ref({
  email: ''
})
const onSubmit = () => {
  // todo 提交表单
}

</script>

<template>
  <div class="config-page">
    <!--   todo 表单内容-->
    <el-card class="form-card" shadow="never">
      <el-form
          label-width="100px"
          :model="configModel"
          :rules="rules"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="configModel.email"/>
        </el-form-item>

        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.submit-btn {
  width: 100%;
}
</style>