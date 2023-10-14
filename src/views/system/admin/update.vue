<script setup>
import AdminDetail from "@/views/system/admin/components/AdminDetail.vue";
import {updateAdmin} from "@/api/system/admin";
import {ElMessage} from "element-plus";
import router from "@/router";

const handleUpdate = async (obj) => {
  try {
    const res = await updateAdmin(obj);
    ElMessage.success(res.message);
    router.back()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <AdminDetail :add-flag="false" @onSubmit="handleUpdate"/>
</template>

<style scoped>

</style>