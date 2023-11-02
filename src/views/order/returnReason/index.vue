<script setup>
import {onMounted, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {getReturnReasonList, deleteReturnReason, addReturnReason, updateReturnReason} from "@/api/order/returnReason";
import ReturnReasonDetail from "@/views/order/returnReason/components/ReturnReasonDetail.vue";

// ============================== 属性 =======================================

// -------表格--------
const tableData = ref([])
const loadStatus = ref(false)

// ------弹窗---------
const addFlag = ref(true);
const detailRef = ref(null);
// ==============================  事件监听 =======================================

const onAdd = () => {
  addFlag.value = true;
  detailRef.value.handleOpen({});
}

const onEdit = (row) => {
  addFlag.value = false;
  detailRef.value.handleOpen({...row});
}

const onDelete = async (row) => {
  const id = row.id;

  try {
    const res = await deleteReturnReason(id)
    ElMessage.success(res.message)
    await loadData()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const onSubmit = async (model) => {
  try {
    let resp;
    if (addFlag.value) {
      resp = await addReturnReason(model)
    } else {
      resp = await updateReturnReason(model)
    }
    if (resp) {
      ElMessage.success(resp.message)
      detailRef.value.handleClose()
    }
  } catch (e) {
    ElMessage.error(e.message)
  }
}

// ==============================  方法 =======================================

// -------加载分页数据--------
const loadData = async () => {
  loadStatus.value = true
  try {
    const resp = await getReturnReasonList()
    if (resp) tableData.value = resp.data;
  } catch (e) {
    ElMessage.error(e.messages)
  } finally {
    loadStatus.value = false
  }

}


// ==============================  钩子 =======================================

onMounted(async () => {
  await loadData()
})

</script>

<template>
  <div class="return-reason-page">

    <el-card class="content-card" shadow="never">
      <SectionTitle title="数据列表">
        <el-button type="primary" @click="onAdd">创建</el-button>
      </SectionTitle>

      <el-table :data="tableData" v-loading="loadStatus" border>

        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="reason" label="退货原因" show-overflow-tooltip/>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column prop="enable" label="状态"/>

        <el-table-column prop="createTime" label="开始时间"/>

        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="default" size="small" @click="onEdit(scope.row)">编辑</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
              <template #reference>
                <el-button type="default" size="small">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <ReturnReasonDetail ref="detailRef"
                        @onSubmit="onSubmit"
                        :add-flag="addFlag"/>
  </div>
</template>

<style scoped>

</style>