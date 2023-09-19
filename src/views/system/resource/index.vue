<script setup>

import SectionTitle from "@/components/SectionTitle.vue";
import {reactive} from 'vue';

const tableData = reactive([
  {
    id: 1,
    resourceName: '系统管理',
    resourceType: 1,
    path: '/system',
    permission: 'system',
    children: [
      {
        id: 2,
        resourceName: '用户管理',
        resourceType: 1,
        path: '/system/user',
        permission: 'system:user',
        children: [
          {
            id: 21,
            resourceName: '编辑用户',
            resourceType: 2,
            permission: 'system:user:edit',
          },
          {
            id: 22,
            resourceName: '添加用户',
            resourceType: 2,
            permission: 'system:user:add',
          },
          {
            id: 23,
            resourceName: '删除用户',
            resourceType: 2,
            permission: 'system:user:delete',
          },

        ]
      },
      {
        id: 3,
        resourceName: '角色管理',
        resourceType: 1,
        path: '/system/role',
        permission: 'system:role',
      },
      {
        id: 4,
        resourceName: '资源管理',
        resourceType: 1,
        path: '/system/resource',
        permission: 'system:resource',
      },
      {
        id: 5,
        resourceName: '日志管理',
        resourceType: 1,
        path: '/system/log',
        permission: 'system:log',
      },
      {
        id: 6,
        resourceName: '配置管理',
        resourceType: 1,
        path: '/system/config',
        permission: 'system:config',
      }
    ]
  },
])

const onEdit = (row) => {
  console.log(row)
}

const onDelete = (id) => {
  console.log(id)
}

</script>

<template>
  <el-card class="content-card">
    <template #header>
      <SectionTitle title="数据列表"/>
    </template>
    <div class="table-wrapper">
      <el-table :data="tableData"
                max-height="700"
                row-key="id"
                border
                default-expand-all>
        <el-table-column prop="id" label="资源id"/>
        <el-table-column prop="resourceName" label="资源名称"/>
        <el-table-column prop="path" label="资源路径"/>
        <el-table-column prop="resourceType" label="资源类型">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.resourceType === 1">菜单</el-tag>
            <el-tag v-if="scope.row.resourceType === 2">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="资源权限" />
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button v-if="scope.row.resourceType === 1" type="warning" size="small" @click="onEdit(scope.row)">添加</el-button>
            <el-button type="warning" size="small" @click="onEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  }
}


</style>