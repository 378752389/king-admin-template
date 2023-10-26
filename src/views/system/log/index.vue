<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {onMounted, reactive, ref} from 'vue';
import {getLogPage} from '@/api/system/log';
import {ElMessage} from "element-plus";

const searchForm = ref({
  createBy: '',
  content: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})


const tableData = ref([])
const tableDataLoading = ref(false)

const searchFormRef = ref(null)

const onSearch = () => {
  loadData()
}
const onReset = () => {
  // 在模板中必须填写 prop 字段
  searchFormRef.value.resetFields();
}

const loadData = async () => {
  tableDataLoading.value = true;
  try {
    const pageDataResult = await getLogPage({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm.value
    });
    tableData.value = pageDataResult.data.dataList;
    pageData.pageNum = pageDataResult.data.pageNum;
    pageData.pageSize = pageDataResult.data.pageSize;
    pageData.total = pageDataResult.data.total;
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    tableDataLoading.value = false;
  }


}

const pageNumChange = (pageNum) => {
  pageData.pageNum = pageNum;
  loadData()
}
const pageSizeChange = (pageSize) => {
  pageData.pageSize = pageSize;
  loadData()
}


onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="log-page">
    <el-card shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="日志内容" prop="content">
          <el-input v-model="searchForm.content" />
        </el-form-item>
        <el-form-item label="操作人" prop="createBy">
          <el-input v-model="searchForm.createBy" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <SectionTitle title="数据列表"/>
      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="tableDataLoading" border>
        <el-table-column type="index" label="序号"/>
        <el-table-column prop="createBy" label="用户名"/>
        <el-table-column prop="content" label="操作内容" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间"/>
      </el-table>

      <!--      分页-->
      <el-pagination background layout="prev, pager, jumper, next, total, sizes"
                     v-model:current-page="pageData.pageNum"
                     v-model:page-size="pageData.pageSize"
                     :page-sizes="pageData.pageSizeList"
                     :total="pageData.total"
                     @current-change="pageNumChange"
                     @size-change="pageSizeChange"/>


    </el-card>
  </div>
</template>

<style lang="less" scoped>
</style>