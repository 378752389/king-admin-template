<script setup>
import {getProductPageApi, deleteProductApi} from "@/api/content/product";
import {ref, onMounted, reactive} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router';
import {getCategoryListApi} from "@/api/content/category";

// ============================== 钩子 =======================================

const searchForm = reactive({
  name: '',
  categoryId: ''
});
const searchFormRef = ref(null)

const categorySelect = ref([])

const loadStatus = ref(false)

const tableData = ref([])

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const router = useRouter();
// ============================== 事件 =======================================

/**
 * 表单搜索
 */
const onSearch = () => {
  loadData()
}


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
    name: 'product-add'
  })
}


/**
 * 修改管理员
 */
const onEdit = (id) => {
  router.push({
    name: 'product-update',
    query: {
      id
    }
  })
}

/**
 * 删除管理员
 * @param row
 */
const onDelete = async (row) => {
  const id = row.id;

  const res = await deleteProductApi(id)
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
    const resp = await getProductPageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm
    })

    if (resp && resp.data) {
      // todo
      tableData.value = resp.data.dataList;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }
  } finally {
    loadStatus.value = false
  }


}

const loadCategorySelect = async () => {
  const resp = await getCategoryListApi({type: 2})
  if (resp && resp.code === 200) {
    categorySelect.value = resp.data
  }
}

// ============================== 钩子 =======================================
/**
 * 页面挂载
 */
onMounted(async () => {
  await loadData()
  await loadCategorySelect()
})

</script>

<template>
  <div class="product-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="套餐名称" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="商品名称"/>
        </el-form-item>
        <el-form-item label="商品分类" prop="categoryId">
          <el-select
              v-model="searchForm.categoryId"
              placeholder="商品分类">
            <el-option :key="category.id"
                       :label="category.name"
                       :value="category.id"
                       v-for="category in categorySelect"/>
          </el-select>
        </el-form-item>
        <el-form-item style="">
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
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="loadStatus" border>
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="name" label="商品名" show-overflow-tooltip/>
        <el-table-column prop="categoryName" label="所属分类"/>
        <el-table-column prop="price" label="售价"/>
        <el-table-column prop="description" label="商品介绍" show-overflow-tooltip/>
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

  </div>

</template>

<style lang="less" scoped>
</style>