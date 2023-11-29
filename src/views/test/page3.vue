<script setup>
import {LazyImg, Waterfall} from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import {ref} from 'vue';

const list = ref([
  {name: 'aaa', height: '400px'},
  {name: 'bbb', height: '200px'},
  {name: 'ccc', height: '300px'},
  {name: 'ddd', height: '250px'},
])
</script>

<template>

  <div class="page3">
    <Waterfall :list="list" :width="800">
      <template #item="{ item }">
        <el-card shadow="never" :style="{'height': item.height}">
          <p class="text">这是具体内容 {{ item }}</p>
        </el-card>
      </template>
    </Waterfall>
  </div>


</template>

<style scoped>
.waterfall-list {
  background: #13ce66;
}
</style>