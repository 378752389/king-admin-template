<script setup>
import TestCard from "@/views/test/components/TestCard.vue";
import {ref} from 'vue'

const myTitle = ref('')
const myContent = ref({})
const count = ref(0)

const titleList = ['test1', 'test2', 'test3']

const changeTitle = () => {
  const idx = Math.floor(Math.random() * titleList.length)
  myTitle.value = titleList[idx]
}

const changeContent = () => {
  count.value++;
  setTimeout(() => {
    myContent.value = {
      head: 'xxx' + count.value,
      body: 'qwe' + count.value,
      foot: 'zxc' + count.value
    }
  }, 1000)
}

</script>

<template>
  <TestCard :title="myTitle" :content="myContent"/>

  <el-row>
    <el-button @click="changeTitle">修改title</el-button>
    <el-button @click="changeContent">修改content</el-button>
  </el-row>
</template>

<style scoped>
  .el-row {
    margin: 20px 0;
  }
</style>