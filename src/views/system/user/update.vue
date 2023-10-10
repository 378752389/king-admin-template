<script setup>
import UserDetail from "@/views/system/user/components/UserDetail.vue";
import {updateAdmin} from "@/api/system/admin";
import {ElMessage} from "element-plus";
import router from "@/router";

const handleUpdate = (obj) => {
  updateAdmin(obj).then(res => {
    ElMessage({
      message: res.message,
      type: 'success'
    })

    router.back()
  })
}
</script>

<template>
  <UserDetail :add-flag="false" @onSubmit="handleUpdate"/>
</template>

<style scoped>

</style>