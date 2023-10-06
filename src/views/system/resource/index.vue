<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {ref, onMounted} from 'vue';
import {getResourceTreeApi, deleteResourceApi, addResourceApi, updateResourceApi} from "@/api/system/resource";
import {ElMessage} from "element-plus";
import ResourceDetail from "@/views/system/resource/components/ResourceDetail.vue";

const tableData = ref([])
const addFlag = ref(false)
const resourceDetailRef = ref(null)
const onEdit = (row) => {
  addFlag.value = false;
  resourceDetailRef.value.handleOpen({...row})
}


const onAdd = async (row) => {
  let parentId
  if (row) {
    parentId = row.id
  }
  addFlag.value = true;
  resourceDetailRef.value.handleOpen({}, parentId)
}

const doSubmit = async (row) => {
  let res
  if (addFlag.value) {
    res = await addResourceApi(row)
  } else {
    res = await updateResourceApi(row)
  }

  ElMessage({
    message: res.message,
    type: 'success'
  })

  await loadData()
}

const onDelete = async (row) => {
  const res = await deleteResourceApi(row.id)
  ElMessage({
    message: res.message,
    type: "success"
  })
  await loadData()
}

const loadData = async () => {
  const res = await getResourceTreeApi()
  tableData.value = res.data
}

onMounted(async () => {
  await loadData()
})

</script>

<template>
  <el-card class="content-card">
    <template #header>
      <SectionTitle title="数据列表"/>
    </template>
    <el-table :data="tableData"
              max-height="500"
              row-key="id"
              border>
      <el-table-column prop="id" label="资源id"/>
      <el-table-column prop="resourceName" label="资源名称"/>
      <el-table-column prop="path" label="资源路径"/>
      <el-table-column prop="resourceType" label="资源类型">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.resourceType === 0">菜单</el-tag>
          <el-tag v-if="scope.row.resourceType === 1">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="资源权限"/>
      <el-table-column label="管理" align="center">
        <template #default="scope">
          <el-button v-if="scope.row.resourceType === 0" type="primary" size="small" @click="onAdd(scope.row)">添加
          </el-button>
          <el-button type="warning" size="small" @click="onEdit(scope.row)">修改</el-button>

          <el-popconfirm
              width="220"
              @confirm="onDelete(scope.row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="king-question-filled"
              icon-color="#626AEF"
              title="请确认是否删除资源？">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAdd">
      添加一级菜单
    </el-button>
  </el-card>

  <ResourceDetail @on-submit="doSubmit" ref="resourceDetailRef" :add-flag="addFlag"/>
</template>

<style lang="less" scoped>

</style>