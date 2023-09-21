<script setup>
import {getUserPage} from "@/api/system/user";
import {ref, onMounted} from "vue";
import {useUserInfoStore} from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();

const userList = ref([])
const renderData = async () => {
  const params = {pageNum: 1, pageSize: 10}
  // 分页获取用户列表数据
  const userListResult = await getUserPage(params);
  userList.value = userListResult.data.dataList;
}

onMounted(() => {
  renderData()
})

const printUserInfo = () => {
  console.log(userInfoStore.menuList, userInfoStore.permissionList, userInfoStore.userInfo)
}
</script>

<template>
  <h1>系统用户页</h1>
  <h2 v-auth="'system:user:add'"><span>haha </span>admin</h2>
  <ul>
    <li :key="user.id" v-for="user in userList">
      {{ user }}
    </li>
  </ul>
  <el-button type="primary" @click="printUserInfo">click me</el-button>
</template>

<style scoped>

</style>