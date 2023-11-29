<script setup>
import {getFilePageApi, getFileTypeApi} from '@/api/system/file';
import {onMounted, reactive, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";

const searchForm = ref({
  bizType: '',
  srcName: '',
  uploadTime: '',
  uploadBy: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = ref([])
const bizTypeList = ref([])
const downloadPath = import.meta.env.VITE_FILE_DOWNLOAD_PATH
const shortcuts = [
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
  {
    text: '两周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7 * 2)
      return date
    },
  },
  {
    text: '四周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7 * 4)
      return date
    },
  },
]

/**
 * 页面挂载
 */
onMounted(() => {
  loadData()

  getFileTypeApi().then(resp => {
    if (resp && resp.data) {
      bizTypeList.value = resp.data;
    }
  })
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
    const resp = await getFilePageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm.value
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

const searchFormRef = ref(null)
/**
 * 重制搜索表单
 */
const onReset = () => {
  searchFormRef.value.resetFields()
  loadData()
}


/**
 * 修改管理员
 */
const onDownload = (row) => {
  // todo
  console.log(row)
  let ele = document.createElement("a");
  ele.download = row.srcName;
  ele.target = '_blank';
  ele.href = downloadPath + row.relativePath;
  ele.click();
}

/**
 * 删除管理员
 * @param row
 */
const onDelete = (row) => {
  // const id = row.id;
  // 删除成功后重新加载
  // todo
  // ElMessage.success(res.message)
  // loadData()
}


</script>

<template>
  <div class="file-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="文件名称" prop="srcName">
          <el-input v-model="searchForm.srcName"/>
        </el-form-item>

        <el-form-item label="文件业务类型" prop="bizType">
          <el-select
              v-model="searchForm.bizType"
              placeholder="请选择业务类型"
          >
            <el-option :key="bizType" :label="bizType" :value="bizType" v-for="bizType in bizTypeList"/>
          </el-select>
        </el-form-item>

        <el-form-item label="上传日期" prop="uploadTime">
          <el-date-picker
              value-format="YYYY-MM-DD"
              v-model="searchForm.uploadTime"
              type="date"
              :shortcuts="shortcuts"
              placeholder="请选择日期"
              :default-value="new Date()"
          />
        </el-form-item>

        <el-form-item label="操作者" prop="uploadBy">
          <el-select
              placeholder="请选择操作者"
              v-model="searchForm.uploadBy">
          </el-select>
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
        <el-table-column prop="srcName" label="原文件名称" show-overflow-tooltip/>
        <el-table-column prop="mimeType" label="文件类型"/>
        <el-table-column prop="fileSizeReadable" label="文件大小"/>
        <el-table-column prop="bizType" label="业务类型"/>
        <el-table-column prop="uploadTime" label="上传时间"/>
        <el-table-column prop="uploadBy" label="操作人员"/>
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" @click="onDownload(scope.row)">下载</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
              <template #reference>
                <el-button v-auth="'system:file:del'" type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
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