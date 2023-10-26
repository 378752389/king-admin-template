<script setup>
import SectionTitle from "@/components/SectionTitle.vue";
import {onMounted, ref} from "vue";
import RoleDetail from "@/views/system/role/components/RoleDetail.vue";
import {getRoleListApi, deleteRoleApi, addRoleApi, updateRoleApi} from "@/api/system/role";
import {getResourceListApi} from "@/api/system/resource";
import {ElMessage} from "element-plus";

const searchForm = ref({
  roleName: '',
})


const tableData = ref([])

const addFlag = ref(false);
const roleDetailRef = ref(null);
const searchFormRef = ref(null);
const loadStatus = ref(false);
const loadData = async () => {
  loadStatus.value = true;
  const roleRes = await getRoleListApi({...searchForm.value});
  tableData.value = roleRes.data;
  loadStatus.value = false;
}

onMounted(() => {
  loadData()
})


const onReset = () => {
  searchFormRef.value.resetFields();
  loadData()
}
const onEdit = async (row) => {
  addFlag.value = false;
  getResourceListApi(row.id).then(res => {
    let resourceIds = [];
    res.data && (resourceIds = res.data.map(x => x.id))
    const formData = {...row, resourceIds}
    roleDetailRef.value.handleOpen(formData)
  })

}
const onDelete = async (row) => {
  const id = row.id;
  try {
    const res = await deleteRoleApi(id)
    ElMessage.success(res.message)
    await loadData()
  } catch (e) {
    console.error(e)
  }
}
const onAdd = () => {
  addFlag.value = true;
  roleDetailRef.value.handleOpen({});
}

const onSearch = () => {
  loadData()
}
const doSubmit = async (role) => {
  let res;
  try {
    if (addFlag.value) {
      res = await addRoleApi({
        roleName: role.roleName,
        resourceIds: role.resourceIds
      })
    } else {
      res = await updateRoleApi({
        id: role.id,
        roleName: role.roleName,
        resourceIds: role.resourceIds
      })
    }
    ElMessage.success(res.message)
  } catch (e) {
    console.error(e)
  } finally {
    roleDetailRef.value.handleClose()
  }

  await loadData()
}


</script>

<template>
  <div class="role-page">
    <el-card class="search-card" shadow="never">
      <template #header>
        <SectionTitle title="查询搜索"/>
      </template>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="searchForm.roleName" placeholder="输入角色名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
          <el-button type="success" @click="onAdd">创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <template #header>
        <SectionTitle title="数据列表"/>
      </template>
      <div class="table-wrapper">
        <!--     todo 表格数据-->
        <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
        <el-table :data="tableData" table-layout="fixed" v-loading="loadStatus" border>
          <el-table-column prop="id" label="角色id"/>
          <el-table-column prop="roleName" label="角色名称"/>
          <el-table-column prop="createTime" label="创建时间"/>
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
                  title="请确认是否删除角色？">
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <RoleDetail @on-submit="doSubmit"
                :add-flag="addFlag"
                ref="roleDetailRef"/>
  </div>

</template>

<style lang="less" scoped>
</style>