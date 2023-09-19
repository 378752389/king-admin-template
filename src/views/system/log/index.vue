<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {reactive, ref} from 'vue';

const searchForm = ref({
  id: '',
  roleName: '',
  createTime: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = reactive([
  {
    id: 1,
    roleName: 'admin',
    createTime: ''
  },
  {
    id: 2,
    roleName: 'development',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },{
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },{
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
  {
    id: 3,
    roleName: 'operation',
    createTime: ''
  },
])

const searchFormRef = ref(null)

const onSearch = () => {

}
const onReset = () => {
  // 在模板中必须填写 prop 字段
  searchFormRef.value.resetFields();
}

const onAdd = () => {

}

const onEdit = (row) => {
  console.log(row)
}
</script>

<template>
  <el-card class="search-card">
    <template #header>
      <SectionTitle title="查询搜索"/>
    </template>

    <!--      todo 查询表单数据-->
    <el-form ref="searchFormRef" :inline="true" :model="searchForm">
      <el-form-item label="id" prop="id">
        <el-input v-model="searchForm.id" placeholder="角色id" />
      </el-form-item>
      <el-form-item label="角色名" prop="roleName">
        <el-select
            v-model="searchForm.roleName"
            placeholder="角色名称"
            clearable
        >
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
            v-model="searchForm.createTime"
            type="datetime"
            placeholder="角色创建时间"
            clearable
        />
      </el-form-item>
      <el-form-item style="">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
        <el-button type="success" v-auth="'system:user:add'" @click="onAdd">创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-divider/>

  <el-card class="content-card">
    <template #header>
      <SectionTitle title="数据列表"/>
    </template>
    <!--     todo 表格数据-->
    <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
    <div class="table-wrapper">
      <el-table :data="tableData" max-height="500">
        <el-table-column prop="id" label="角色id"/>
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" @click="onEdit(scope.row)">编辑</el-button>
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
                     :total="pageData.total"/>
    </div>


  </el-card>
</template>

<style lang="less" scoped>

.content-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

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
      bottom: 10px;
      background-color: white;
      z-index: 10;

      .el-pagination {
        justify-content: right;
      }
    }
  }
}


</style>