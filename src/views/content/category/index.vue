<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {reactive, ref, onMounted} from 'vue';
import {getCategoryPage, removeCategories} from '@/api/content/category';
import CategoryDetail from "@/views/content/category/components/CategoryDetail.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const searchForm = ref({
  categoryName: '',
});

const tableDataLoading = ref(false)


const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})


const tableData = ref([])
const addFlag = ref(false)
const categoryDetailRef = ref(null)
const searchFormRef = ref(null)

const onSearch = () => {

}
const onReset = () => {
  // 在模板中必须填写 prop 字段
  searchFormRef.value.resetFields();
}

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
    return new Promise((resolve) => {
      getCategoryPage({}).then(res => {
        // 正常处理
        // todo
        row.enable = !row.enable;
        ElMessage.success(res.message);
        resolve(true);
      }).catch(e => {
        // 错误异常处理， 异常进行打印，不进行抛出
        ElMessage.error(e.message)
      }).finally(() => {
        row.switchLoading = false;
      })
    })

  }).catch(() => {
    ElMessage.info("取消操作")
  })
}

const onAdd = () => {
  addFlag.value = true;
}

const onEdit = (row) => {
  addFlag.value = false;
  categoryDetailRef.value.handleOpen(row);
}

const onDelete = (row) => {
  removeCategories([row.id])
  console.log(row)
}

const loadData = async (page) => {
  tableDataLoading.value = true;
  try {
    const pageDataResult = await getCategoryPage(page || {});
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
  loadData({pageNum, pageSize: pageData.pageSize})
}
const pageSizeChange = (pageSize) => {
  loadData({pageSize, pageNum: pageData.pageNum})
}


onMounted(async () => {
  await loadData(pageData.value)
})
</script>

<template>
  <el-card class="search-card" shadow="never">
    <SectionTitle title="查询搜索"/>

    <!--      todo 查询表单数据-->
    <el-form ref="searchFormRef" :inline="true" :model="searchForm">
      <el-form-item label="用户名" prop="categoryName">
        <el-select
            v-model="searchForm.categoryName"
            placeholder="目录名称"
            clearable>
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
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
          <el-image :src="scope.row.icon"
                    style="width: 30px;height: 30px;"
                    :preview-teleported="true"
                    :preview-src-list="[scope.row.icon]"/>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="分类名称" show-overflow-tooltip/>
      <el-table-column prop="level" label="级别"/>
      <el-table-column prop="count" label="商品数量"/>
      <el-table-column label="发布状态">
        <template #default="scope">
          <el-switch
              :model-value="scope.row.enable"
              @input="onStatusInput(scope.row)"
              :loading="!!scope.row.switchLoading"
          />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="目录描述" show-overflow-tooltip/>
      <el-table-column prop="order" label="发布排序顺序"/>


      <el-table-column label="管理" align="center">
        <template #default="scope">
          <el-button type="warning" size="small" plain @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" plain @click="onDelete(scope.row)">删除</el-button>
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
  <CategoryDetail :add-flag="addFlag" ref="categoryDetailRef"/>
</template>

<style lang="less" scoped>

</style>