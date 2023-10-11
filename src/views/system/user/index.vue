<script setup>
import {getAdminPage, deleteAdmin} from "@/api/system/admin";
import {ref, onMounted, reactive} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router';

const router = useRouter();
const searchForm = ref({
  username: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = ref([])

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
const loadData = () => {
  loadStatus.value = true
  getAdminPage({
    pageNum: pageData.pageNum,
    pageSize: pageData.pageSize,
    ...searchForm.value
  }).then(resp => {
    if (resp && resp.data) {
      tableData.value = resp.data.dataList;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }
    loadStatus.value = false
  })
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
 * 添加管理员
 */
const onAdd = () => {
  router.push({
    name: 'user-add'
  })
}


/**
 * 修改管理员
 */
const onEdit = (id) => {
  router.push({
    name: 'user-update',
    query: {
      id
    }
  })
}

/**
 * 删除管理员
 * @param row
 */
const onDelete = (row) => {
  const id = row.id;
  deleteAdmin(id).then(res => {
    // 删除成功后重新加载
    ElMessage({
      message: res.message,
      type: 'success'
    })

    loadData()
  })
}


</script>

<template>
  <el-card class="search-card">
    <template #header>
      <SectionTitle title="查询搜索"/>
    </template>

    <!--      todo 查询表单数据-->
    <el-form ref="searchFormRef" :inline="true" :model="searchForm">
      <el-form-item label="用户名" prop="username">
        <el-input
            v-model="searchForm.username"
            placeholder="用户名"/>
      </el-form-item>
      <el-form-item style="">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
        <el-button type="success" @click="onAdd">创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="content-card">
    <template #header>
      <SectionTitle title="数据列表"/>
    </template>
    <!--     todo 表格数据-->
    <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
    <el-table :data="tableData" v-loading="loadStatus">
      <el-table-column type="index" width="120" label="序号"/>
      <el-table-column label="头像">

      </el-table-column>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="description" label="描述" show-overflow-tooltip/>
      <el-table-column label="管理" align="center">
        <template #default="scope">
          <el-button type="warning" size="small" @click="onEdit(scope.row.id)">编辑</el-button>

          <el-popconfirm
              width="220"
              @confirm="onDelete(scope.row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="king-question-filled"
              icon-color="#626AEF"
              title="请确认是否删除管理员？">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
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

</template>

<style scoped>
</style>