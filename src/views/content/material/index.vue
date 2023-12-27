<script setup>
import {ref, onMounted, reactive} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {
  getMaterialPageApi,
  deleteMaterialApi,
  addMaterialApi,
  updateMaterialApi
} from "@/api/content/material";
import MaterialDetail from "@/views/content/material/components/MaterialDetail.vue";

// ============================== 钩子 =======================================

const searchForm = reactive({
  name: '',
});
const searchFormRef = ref(null)

const loadStatus = ref(false)

const tableData = ref([])
const addFlag = ref(true)
const materialDetailRef = ref(null)

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

// ============================== 事件 =======================================

/**
 * 表单搜索
 */
const onSearch = () => {
  loadData()
}

const onSubmit = async (model) => {
  let resp;
  if (addFlag.value) {
    resp = await addMaterialApi(model)
  } else {
    resp = await updateMaterialApi(model)
  }

  ElMessage.success(resp.message)
  materialDetailRef.value.handleClose()

  await loadData()
}

/**
 * 重制搜索表单
 */
const onReset = () => {
  searchFormRef.value.resetFields()
}

/**
 * 添加管理员
 */
const onAdd = () => {
  addFlag.value = true
  materialDetailRef.value.handleOpen({})
}


/**
 * 修改管理员
 */
const onEdit = (row) => {
  addFlag.value = false
  materialDetailRef.value.handleOpen({...row})
}

/**
 * 删除管理员
 * @param row
 */
const onDelete = async (row) => {
  const id = row.id;

  const res = await deleteMaterialApi(id)
  ElMessage.success(res.message)
  await loadData()
}

const pageNumChange = (pageNum) => {
  loadData({pageNum, pageSize: pageData.pageSize, ...searchForm})
}
const pageSizeChange = (pageSize) => {
  loadData({pageSize, pageNum: pageData.pageNum, ...searchForm})
}

// ============================== 加载数据 =======================================

const loadData = async () => {
  loadStatus.value = true
  try {
    const resp = await getMaterialPageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm
    })

    if (resp && resp.data) {
      // todo
      tableData.value = resp.data;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }
  } finally {
    loadStatus.value = false
  }


}


// ============================== 钩子 =======================================
/**
 * 页面挂载
 */
onMounted(async () => {
  try {
    await loadData()
  } catch (e) {
    ElMessage.error(e.message)
  }
})

</script>

<template>
  <div class="material-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="物料名称" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="物料名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <SectionTitle title="数据列表">
        <el-button type="success" @click="onAdd">创建</el-button>
      </SectionTitle>

      <!--     todo 表格数据-->
      <el-table :data="tableData" v-loading="loadStatus" border header-cell-class-name="custom-header">
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="name" label="商品名" show-overflow-tooltip/>
        <el-table-column label="图片">
          <template #default="scope">
            <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.pic"
                :zoom-rate="1.2"
                :max-scale="7"
                :preview-teleported="true"
                :min-scale="0.2"
                :preview-src-list="[scope.row.pic]"
                fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="description" label="商品介绍" show-overflow-tooltip/>
        <el-table-column prop="price" label="价格" />
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" @click="onEdit(scope.row)">编辑</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
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

    <MaterialDetail
        @on-submit="onSubmit"
        ref="materialDetailRef"
        :add-flag="addFlag"/>
  </div>
</template>

<style lang="less" scoped>
</style>