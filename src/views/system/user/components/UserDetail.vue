<script setup>
import {reactive} from "vue";
import router from "@/router";


const props = defineProps(['model']);

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})

const $emit = defineEmits(["onSubmit"])
const handleSubmit = () => {
  $emit('onSubmit', {...props.model})
}

const handleCancel = () => {
  router.back();
}
</script>

<template>
  <el-card>
    <el-form
        label-position="right"
        label-width="100px"
        :model="model"
        :rules="roleRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"/>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="model.avatar"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="model.gender"/>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="model.phone"/>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="model.qq"/>
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="model.wechat"/>
      </el-form-item>
      <el-form-item label="职业" prop="occupation">
        <el-input v-model="model.occupation"/>
      </el-form-item>
      <el-form-item label="详情" prop="description">
        <el-input v-model="model.description"/>
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>