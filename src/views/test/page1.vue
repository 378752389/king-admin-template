<script setup>
import {useUserInfoStore} from "@/stores/userInfo";
import {ElMessage} from "element-plus";

const userInfoStore = useUserInfoStore();
const sendRequest = () => {
  userInfoStore.getMenu();
}

const sendRequest1 = () => {
  console.log(userInfoStore.menuList);
}

const click1 = () => {
  ElMessage({
    message: "yes",
    type: 'warning',
  })
}
</script>

<template>
  <h1>接口测试页面</h1>

  <el-button @click="sendRequest">发送请求</el-button>
  <el-button @click="sendRequest1">发送请求1</el-button>
  <el-button @click="click1">点击</el-button>
</template>

<style scoped>

</style>