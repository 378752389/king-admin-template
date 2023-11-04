<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {reactive, ref, onMounted} from 'vue';
import {
  getCategoryPageApi,
  addCategoryApi,
  updateCategoryApi,
  removeCategoriesApi,
  switchCategoryPublicStatusApi
} from '@/api/content/category';
import CategoryDetail from "@/views/content/category/components/CategoryDetail.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import SvgIcon from "@/components/SvgIcon.vue";


// ============================== 属性 =======================================

// -------搜索--------
const searchForm = reactive({
  name: '',
  type: 1,
})
const searchFormRef = ref(null)

// -------表格--------
const tableDataLoading = ref(false)
const tableData = ref([])

// -------分页--------
const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

// -------弹窗--------
const addFlag = ref(false)
const categoryDetailRef = ref(null)

// -------发布状态--------
const switchEnable = ref(false)

// ============================== 事件 =======================================
const onSearch = async () => {
  await loadData()
}
const onReset = () => {
  // 在模板中必须填写 prop 字段
  searchFormRef.value.resetFields();
}

// -------发布状态修改--------
const onStatusInput = (row) => {
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
    let id = row.id;
    let newPublic = row.publish === 1 ? 0 : 1
    return new Promise((resolve) => {
      switchCategoryPublicStatusApi({id, publish: newPublic}).then(res => {
        // 正常处理
        // todo
        row.publish = newPublic
        ElMessage.success(res.message);
        resolve(true);
      }).finally(() => {
        row.switchLoading = false;
      })
    })

  }).catch(() => {
    ElMessage.info("取消操作")
  })
}
const publishBeforeChange = () => {
  switchEnable.value = true;
  return switchEnable.value;
}

const onAdd = () => {
  addFlag.value = true;
  categoryDetailRef.value.handleOpen({});
}

const onSubmit = async (entity) => {
  let resp;
  if (addFlag.value) {
    resp = await addCategoryApi(entity);
  } else {
    resp = await updateCategoryApi(entity);
  }
  if (resp && resp.code === 200) {
    ElMessage.success(resp.message)
  }
}

const onEdit = (row) => {
  addFlag.value = false;
  categoryDetailRef.value.handleOpen({...row});
}

const onDelete = async (row) => {
  const resp = await removeCategoriesApi(row.id)
  if (resp && resp.code === 200) {
    ElMessage.success(resp.message)
  }
  await loadData()
}

const loadData = async () => {
  tableDataLoading.value = true;
  try {
    const pageDataResult = await getCategoryPageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm
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
  pageData.pageNum = pageNum
  loadData()
}
const pageSizeChange = (pageSize) => {
  pageData.pageSize = pageSize
  loadData()
}

// ============================== 钩子 =======================================

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <div class="category-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">

        <el-form-item label="类别" prop="type">
          <el-select
              v-model="searchForm.type"
              placeholder="类别"
              clearable>
            <el-option label="套餐" :value="1"/>
            <el-option label="商品" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="目录名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSearch">查询</el-button>
          <el-button type="default" plain @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->

      <SectionTitle :icon="'king-menu'" title="数据列表">
        <template #default>
          <el-button type="success" plain @click="onAdd">添加</el-button>
        </template>
      </SectionTitle>
      <el-table :loading="tableDataLoading" :data="tableData" max-height="700">
        <el-table-column type="index" label="序号" width="120"/>
        <el-table-column prop="icon" label="目录图标">
          <template #default="scope">
<!--            <el-image :src="scope.row.icon"-->
<!--                      style="width: 30px;height: 30px;"-->
<!--                      :preview-teleported="true"-->
<!--                      :preview-src-list="[scope.row.icon]"/>-->
            <SvgIcon :icon="'king-' + scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column label="类别">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 1">套餐</el-tag>
            <el-tag v-if="scope.row.type === 2" type="info">商品</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称" show-overflow-tooltip/>
        <el-table-column label="发布状态">
          <template #default="scope">
            <el-switch
                :active-value="1"
                :inactive-value="0"
                :before-change="publishBeforeChange"
                :model-value="scope.row.publish"
                @input="onStatusInput(scope.row)"
                :loading="!!scope.row.switchLoading"
            />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"/>


        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" plain @click="onEdit(scope.row)">编辑</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
              <template #reference>
                <el-button type="danger" size="small" plain>删除</el-button>
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
    <CategoryDetail :add-flag="addFlag"
                    @on-submit="onSubmit"
                    ref="categoryDetailRef"/>
  </div>
</template>

<style lang="less" scoped>

</style>