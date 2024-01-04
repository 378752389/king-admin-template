<script setup>
import {ref, onMounted} from 'vue';
import axios from "axios";

const list = ref([
  {name: 'aaa', height: '400px'},
  {name: 'bbb', height: '200px'},
  {name: 'ccc', height: '300px'},
  {name: 'ddd', height: '250px'},
])

const suggest = ref()

onMounted(async () => {
  const resp = await axios({
    url: "/search/suggest",
    method: "GET",
    query: {
      suggest: "下午"
    }
  })

  console.log(resp)
})
</script>

<template>

  <div class="page3">
   <el-input v-model="suggest" />
  </div>


</template>

<style scoped>
.waterfall-list {
  background: #13ce66;
}
</style>