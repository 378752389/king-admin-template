<script setup>
import {getUserList} from "@/api/system/user";
import {ref} from "vue";

const userList = ref([])
const renderData = async () => {
  // 分页获取用户列表数据
  const userListResult = await getUserList();
  userList.value = userListResult.data.dataList;
}

renderData()
</script>

<template>
  <h1>系统用户页</h1>
  <ul>
    <li :key="user.id" v-for="user in userList">
      {{ user}}
    </li>
  </ul>
</template>

<style scoped>

</style>