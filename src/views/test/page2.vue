<script setup>
import {onMounted, ref} from "vue";
import {getResourceListApi} from "@/api/system/resource";

const rootRef = ref(null)

onMounted(async () => {
  const result = await getResourceListApi(1)
  console.log(rootRef.value.children[0].innerHTML = JSON.stringify(result));
})
</script>

<template>
  <div ref="rootRef" class="page2">
    <el-card shadow="never">
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
    </el-card>

    <el-card shadow="never">
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
    </el-card>

    <el-card shadow="never">
      asd<br/>
    </el-card>

    <el-card shadow="never">
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
    </el-card>

    <el-card shadow="never">
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
    </el-card>
  </div>
</template>

<style scoped>



</style>