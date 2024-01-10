<script setup>
import {ref} from 'vue';

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const onMove = (idx, step) => {
  const tmp = tableData.value[idx]
  tableData.value[idx] = tableData.value[idx + step]
  tableData.value[idx + step] = tmp
}
</script>

<template>

  <div class="page4">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180"/>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="address" label="Address"/>

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button :disabled="scope.$index === 0" @click="onMove(scope.$index, -1)">上移</el-button>
          <el-button :disabled="scope.$index === tableData.length - 1" @click="onMove(scope.$index, 1)">下移
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>

</style>