<script setup>
import request from "@/utils/request";

const query = async () => {
  const resp = await request({
    url: '/test/1',
    method: 'get',
  })

  console.log(resp)
}

const create = () => {

}

const update = () => {

}

const remove = () => {

}

const userInfo = () => {

}
</script>

<template>
  <div class="page1">
    <h1>接口测试页面</h1>

    <el-row>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="success" @click="create">创建</el-button>
      <el-button type="warning" @click="update">修改</el-button>
      <el-button type="danger" @click="remove">删除</el-button>
      <el-button type="default" @click="userInfo">获取UserInfo</el-button>
    </el-row>
  </div>
</template>

<style scoped>

</style>