<script setup>
import AdminDetail from "@/views/system/admin/components/AdminDetail.vue";
import {createAdmin} from "@/api/system/admin";
import {ElMessage} from "element-plus";
import router from "@/router";

const handleAdd = async (obj) => {
  try {
    const res = await createAdmin(obj);
    ElMessage.success(res.message)
    router.back()
  } catch (e) {
    console.error(e)
  }

}
</script>

<template>
<AdminDetail :add-flag="true" @onSubmit="handleAdd"/>
</template>

<style scoped>

</style>