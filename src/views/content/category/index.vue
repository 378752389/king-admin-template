<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {reactive, ref, onMounted} from 'vue';
import {getCategoryPage, removeCategorys} from '@/api/content/category';
import CategoryDetail from "@/views/content/category/components/CategoryDetail.vue";

// const searchForm = ref({
//   id: '',
//   categoryName: '',
// });


const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})


const tableData = ref([])
const addFlag = ref(false)
const categoryDetailRef = ref(null)
// const searchFormRef = ref(null)

// const onSearch = () => {
//
// }
// const onReset = () => {
//   // 在模板中必须填写 prop 字段
//   searchFormRef.value.resetFields();
// }


const onAdd = () => {
  addFlag.value = true;
}

const onEdit = (row) => {
  addFlag.value = false;
  categoryDetailRef.value.handleOpen(row);
}

const onDelete = (row) => {
  removeCategorys([row.id])
  console.log(row)
}

const loadData = async (page) => {
  const pageDataResult = await getCategoryPage(page || {});
  tableData.value = pageDataResult.data.dataList;
  pageData.pageNum = pageDataResult.data.pageNum;
  pageData.pageSize = pageDataResult.data.pageSize;
  pageData.total = pageDataResult.data.total;
}

const pageNumChange = (pageNum) => {
  loadData({pageNum, pageSize: pageData.pageSize})
}
const pageSizeChange = (pageSize) => {
  loadData({pageSize, pageNum: pageData.pageNum})
}


onMounted(() => {
  loadData(pageData.value)
})
</script>

<template>
  <!--  <el-card class="search-card">-->
  <!--    <template #header>-->
  <!--      <SectionTitle title="查询搜索"/>-->
  <!--    </template>-->

  <!--    &lt;!&ndash;      todo 查询表单数据&ndash;&gt;-->
  <!--    <el-form ref="searchFormRef" :inline="true" :model="searchForm">-->
  <!--      <el-form-item label="用户名" prop="createBy">-->
  <!--        <el-select-->
  <!--            v-model="searchForm.roleName"-->
  <!--            placeholder="角色名称"-->
  <!--            clearable-->
  <!--        >-->
  <!--          <el-option label="Zone one" value="shanghai"/>-->
  <!--          <el-option label="Zone two" value="beijing"/>-->
  <!--        </el-select>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="操作时间" prop="createTime">-->
  <!--        <el-date-picker-->
  <!--            v-model="searchForm.createTime"-->
  <!--            type="datetime"-->
  <!--            placeholder="角色创建时间"-->
  <!--            clearable-->
  <!--        />-->
  <!--      </el-form-item>-->
  <!--      <el-form-item style="">-->
  <!--        <el-button type="primary" @click="onSearch">查询</el-button>-->
  <!--        <el-button type="default" @click="onReset">重置</el-button>-->
  <!--        <el-button type="success" v-auth="'system:admin:add'" @click="onAdd">创建</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--  </el-card>-->

  <!--  <el-divider/>-->

  <el-card class="content-card">
    <template #header>
      <SectionTitle title="数据列表"/>
      <div class="operate-btn-group">
        <el-button type="success">添加</el-button>
      </div>
    </template>
    <!--     todo 表格数据-->
    <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
    <div class="table-wrapper">
      <el-table :data="tableData" max-height="700">
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
        <el-table-column prop="enable" label="发布状态"/>
        <el-table-column prop="description" label="目录描述" show-overflow-tooltip/>
        <el-table-column prop="order" label="发布排序顺序"/>


        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-wrapper">
      <!--      分页-->
      <el-pagination background layout="prev, pager, jumper, next, total, sizes"
                     v-model:current-page="pageData.pageNum"
                     v-model:page-size="pageData.pageSize"
                     :page-sizes="pageData.pageSizeList"
                     :total="pageData.total"
                     @current-change="pageNumChange"
                     @size-change="pageSizeChange"/>
    </div>


  </el-card>
  <CategoryDetail :add-flag="addFlag" ref="categoryDetailRef" />
</template>

<style lang="less" scoped>

.content-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &:deep(.el-card__header) {
    display: flex;
    justify-content: space-between;

    .operate-btn-group {
        padding-right: 30px;
    }
  }

  &:deep(.el-card__body) {
    position: relative;
    flex-grow: 1;

    .table-wrapper {
      width: calc(100% - 40px);
      position: absolute;
    }

    .page-wrapper {
      width: calc(100% - 40px);
      position: absolute;
      bottom: 0;
      padding: 10px 0;
      background-color: white;
      z-index: 10;

      .el-pagination {
        justify-content: right;
      }
    }
  }
}


</style>