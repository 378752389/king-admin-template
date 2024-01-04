<script setup>

import {onMounted, reactive, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {getMessagePage} from "@/api/system/message";

const searchForm = reactive({
  type: '',
  status: '',
  createTime: '',
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = ref([])

const messageStatusEnum = ref([
  {label: '未投递', value: 0},
  {label: '成功', value: 1},
  {label: '失败', value: 2},
])

const messageTypeEnum = ref([
  {label: '套餐同步', value: '1'},
  {label: '店铺同步', value: '2'},
  {label: '邮件通知', value: '3'},
])

/**
 * 页面挂载
 */
onMounted(() => {
  loadData()
})


const pageNumChange = (pageNum) => {
  loadData({pageNum, pageSize: pageData.pageSize, ...searchForm.value})
}
const pageSizeChange = (pageSize) => {
  loadData({pageSize, pageNum: pageData.pageNum, ...searchForm.value})
}

const loadStatus = ref(false)
const loadData = async () => {
  loadStatus.value = true
  try {
    const resp = await getMessagePage({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm
    })

    if (resp && resp.data) {
      tableData.value = resp.data.dataList;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    loadStatus.value = false
  }


}

/**
 * 表单搜索
 */
const onSearch = () => {
  loadData()
}

const searchFormRef = ref()
/**
 * 重制搜索表单
 */
const onReset = () => {
  searchFormRef.value.resetFields()
  loadData()
}

</script>

<template>
  <div class="file-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="消息类型" prop="type">

          <el-select
              v-model="searchForm.type"
              placeholder="请选择消息状态"
          >
            <el-option placeholder="请选择消息类型" :key="typeEnum.label" :label="typeEnum.label"
                       :value="typeEnum.value"
                       v-for="typeEnum in messageTypeEnum"/>
          </el-select>
        </el-form-item>

        <el-form-item label="消息状态" prop="status">
          <el-select
              v-model="searchForm.status"
              placeholder="请选择消息状态"
          >
            <el-option :key="statusEnum.label" :label="statusEnum.label" :value="statusEnum.value"
                       v-for="statusEnum in messageStatusEnum"/>
          </el-select>
        </el-form-item>

        <el-form-item label="创建日期" prop="createTime">
          <el-date-picker
              value-format="YYYY-MM-DD"
              v-model="searchForm.createTime"
              type="date"
              placeholder="请选择日期"
              :default-value="new Date()"
          />
        </el-form-item>

        <el-form-item style="">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <SectionTitle title="数据列表"/>

      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="loadStatus" border header-cell-class-name="custom-header">
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="id" width="120" label="标识"/>

        <!--        <el-table-column prop="exchange" label="交换机"/>-->
        <!--        <el-table-column prop="queue" label="队列"/>-->
        <!--        <el-table-column prop="routeKey" label="路由键"/>-->

        <el-table-column prop="deliverTime" label="投递时间"/>
        <el-table-column prop="deliverCount" label="投递次数"/>

        <el-table-column prop="content" label="消息内容" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间"/>
        <!--        <el-table-column label="管理" align="center">-->
        <!--          <template #default="scope">-->
        <!--            -->
        <!--          </template>-->
        <!--        </el-table-column>-->
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