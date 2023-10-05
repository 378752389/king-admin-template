<script setup>
import UserDetail from "@/views/system/user/components/UserDetail.vue";

const handleAdd = (obj) => {
  console.log(obj)
}
</script>

<template>
<UserDetail :model="{}" @onSubmit="handleAdd"/>
</template>

<style scoped>

</style>