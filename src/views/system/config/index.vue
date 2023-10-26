<script setup>
import {ref, reactive} from "vue";

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
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
    <el-card>
      <el-form
          label-position="right"
          label-width="100px"
          :model="configModel"
          :rules="roleRules"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="configModel.email"/>
        </el-form-item>

        <el-divider/>

        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.el-card {
  width: 800px;
  margin: 0 auto;

  .submit-btn {
    width: 100%;
  }
}
</style>