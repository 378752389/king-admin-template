<script setup>
import {createAdmin, updateAdmin, deleteAdmin, getAdminPage} from "@/api/system/admin";
import {useUserInfoStore} from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();
const query = () => {
  getAdminPage({pageNum: 1, pageSize: 10}).then(res => {
    console.log(res)
  })
}

const create = () => {
  createAdmin({
    username: 'test',
    password: '123',
    avatar: '',
    email: '',
    gender: '',
    phone: '',
    qq: '',
    wechat: '',
    occupation: '',
    description: ''
  }).then(res => {
    console.log("创建成功", res)
  })
}

const update = () => {
  updateAdmin({
    id: 4,
    username: 'asd',
    password: '123',
    avatar: '',
    email: '',
    gender: '',
    phone: '',
    qq: '',
    wechat: '',
    occupation: '',
    description: ''
  }).then(res => {
    console.log("更新成功", res)
  })
}

const remove = () => {
  deleteAdmin(5).then(res => {
    console.log("删除成功", res)
  })
}

const userInfo = () => {
  console.log(userInfoStore.menuList);
}
</script>

<template>
  <h1>接口测试页面</h1>

  <el-row>
    <el-button type="primary" @click="query">查询</el-button>
    <el-button type="success" @click="create">创建</el-button>
    <el-button type="warning" @click="update">修改</el-button>
    <el-button type="danger" @click="remove">删除</el-button>
    <el-button type="default" @click="userInfo">获取UserInfo</el-button>
  </el-row>
</template>

<style scoped>

</style>