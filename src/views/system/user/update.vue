<script setup>
import UserDetail from "@/views/system/user/components/UserDetail.vue";
import {onMounted} from "vue";
import {getAdmin} from "@/api/system/admin";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {updateAdmin} from "@/api/system/admin";
import {ElMessage} from "element-plus";
import router from "@/router";

const route = useRoute();
const modelData = ref({})

onMounted(() => {
  const id = route.query.id;
  getAdmin(id).then(res => {
    modelData.value = res.data
  })
})
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
  <UserDetail :model="modelData" @onSubmit="handleUpdate"/>
</template>

<style scoped>

</style>