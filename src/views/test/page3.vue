<script setup>
import {ref, onMounted} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {getCategoryPage} from "@/api/content/category";

const onInput = (row) => {
  ElMessageBox.confirm(
      '请确定是否修改发布状态？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    row.switchLoading = true;
    return new Promise((resolve) => {
      getCategoryPage({}).then(res => {
        // 正常处理
        ElMessage.success(res.message);
        row.enable = !row.enable;
        resolve(true);
      }).catch(e => {
        // 错误异常处理
        ElMessage.error(e.message)
      }).finally(() => {
        row.switchLoading = false;
      })
    })

  }).catch(() => {
    ElMessage.info("取消操作")
  })
}

const tableData = ref([])
onMounted(async () => {
  try {
    const res = await getCategoryPage({});
    tableData.value = res.data.dataList;
  } catch (e) {
    ElMessage.error(e)
  }
})

</script>

<template>

  <div class="page3">
    <el-table :data="tableData">
      <el-table-column label="id" prop="id"/>
      <el-table-column label="目录名称" prop="categoryName"/>
      <el-table-column label="发布状态">
        <template #default="scope">
          <el-switch
              :model-value="scope.row.enable"
              @input="onInput(scope.row)"
              :loading="!!scope.row.switchLoading"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>

<style scoped>

</style>