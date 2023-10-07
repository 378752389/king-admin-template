<script setup>
import {ref, onMounted, reactive} from 'vue';
import request from "@/utils/request";
import Page4Detail from "@/views/test/components/Page4Detail.vue";
import Page4DetailV2 from "@/views/test/components/Page4DetailV2.vue";

const searchForm = ref({
  item1: ''
})
const searchFormRef = ref(null)
const tableData = ref([])
const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})
const addFlag = ref(false)
const model = ref({})
const page4DetailRef = ref(null)

onMounted(() => {
  loadData()
})

const loadData = async () => {
  const resp = await request({
    url: '/test/page4',
    method: 'get'
  })

  tableData.value = resp.data.dataList
}

const onSearch = () => {
  loadData()
}

const onReset = () => {
  searchFormRef.value.resetFields();
}

const onAdd = () => {
  model.value = {}
  addFlag.value = true
  page4DetailRef.value.handleOpen()
}
const onEdit = (row) => {
  // model.value = row
  addFlag.value = false
  const target = [1, 2, 3, 4, 5]
  const res = []
  for (let i = 0; i < 3; i++) {
    res.push(target[Math.floor(Math.random() * target.length)])
  }
  setTimeout(() => {
    const data = {...row, customItem1: res}
    page4DetailRef.value.handleOpen(data)
  }, 10)
}

const onDelete = (row) => {

}

const pageNumChange = () => {
}
const pageSizeChange = () => {
}
</script>

<template>

  <el-form ref="searchFormRef" :inline="true" :model="searchForm">
    <el-form-item label="项目一" prop="item1">
      <el-input
          v-model="searchForm.item1"
          placeholder="项目一"/>
    </el-form-item>

    <el-form-item style="">
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button type="default" @click="onReset">重置</el-button>
      <el-button type="success" @click="onAdd">创建</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" border table-layout="fixed">
    <el-table-column prop="item1" label="展示项一"/>
    <el-table-column prop="item2" label="展示项二"/>
    <el-table-column prop="item3" label="展示项三"/>
    <el-table-column prop="item4" label="展示项四"/>
    <el-table-column prop="item5" label="展示项五"/>
    <el-table-column label="管理" align="center">
      <template #default="scope">
        <el-button type="warning" @click="onEdit(scope.row)">编辑</el-button>

        <el-popconfirm
            width="220"
            @confirm="onDelete(scope.row)"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="king-question-filled"
            icon-color="#626AEF"
            title="请确认是否删除角色？">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, jumper, next, total, sizes"
                 v-model:current-page="pageData.pageNum"
                 v-model:page-size="pageData.pageSize"
                 :page-sizes="pageData.pageSizeList"
                 :total="pageData.total"
                 @current-change="pageNumChange"
                 @size-change="pageSizeChange"/>

  <!--  <Page4Detail ref="page4DetailRef" :model="model" :add-flag="addFlag"/>-->
  <Page4DetailV2 ref="page4DetailRef" :model="model" :add-flag="addFlag"/>
</template>

<style lang="less" scoped>
:deep(.el-table__row) {
  height: 80px;
}
</style>