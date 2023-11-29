<script setup>
import {onMounted, reactive, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {getReturnApplyPageApi} from "@/api/order/returnApply";

// ============================== 属性 =======================================

// -------搜索--------
const searchForm = reactive({
  orderNo: '',
  status: '',
  applyTime: '',
  operateBy: '',
  operateTime: ''
})
const searchRules = reactive({
  orderNo: [],
  applyStatus: [],
  applyTime: [],
  operateBy: [],
  operateTime: []
})
const searchFormRef = ref(null)

// -------表格--------
const tableData = ref([])
const loadStatus = ref(false)

// -------分页--------
const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const router = useRouter()

// ==============================  事件监听 =======================================

const onSearch = async () => {
  await loadData()
}

const onReset = () => {
  searchFormRef.value.resetFields()
}

const onDetail = async (row) => {
  const id = row.id
  await router.push({
    name: 'return-apply-detail',
    query: {
      id
    }
  })
}

const pageNumChange = async (pageNum) => {
  pageData.pageNum = pageNum
  await loadData()
}
const pageSizeChange = async (pageSize) => {
  pageData.pageSize = pageSize
  await loadData()
}

// ==============================  方法 =======================================

// -------加载分页数据--------
const loadData = async () => {
  loadStatus.value = true
  try {
    // todo getPageApi
    const resp = await getReturnApplyPageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm
    })

    if (resp && resp.data) {
      tableData.value = resp.data.dataList;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }

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
  <div class="return-apply-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef"
               :inline="true"
               :rules="searchRules"
               :model="searchForm">

        <el-form-item label="订单号" prop="orderNo">
          <el-input
              v-model="searchForm.orderNo"
              placeholder="输入订单号"/>
        </el-form-item>

        <el-form-item label="申请状态" prop="status">
          <el-select
              placeholder="选择申请状态"
              v-model="searchForm.status">
            <el-option label="申请中" value="1" key="申请中"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
              placeholder="选择申请时间"
              value-format="YYYY-MM-DD"
              v-model="searchForm.applyTime"/>
        </el-form-item>

        <el-form-item label="操作人员" prop="operateBy">
          <el-input
              placeholder="选择操作人员"
              v-model="searchForm.operateBy"
          />
        </el-form-item>

        <el-form-item label="处理时间" prop="operateTime">
          <el-date-picker
              placeholder="选择处理时间"
              value-format="YYYY-MM-DD"
              v-model="searchForm.operateBy"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="loadStatus" border header-cell-class-name="custom-header">
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="orderNo" label="订单号" width="220"/>
        <el-table-column prop="applyTime" label="申请时间"/>
        <el-table-column label="退款金额">
          <template #default="scope">
            ￥{{ scope.row.returnAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="申请状态"/>
        <el-table-column prop="operateTime" label="处理时间"/>
        <el-table-column prop="reason" label="退款原因"/>
        <el-table-column prop="description" label="退款描述" show-overflow-tooltip/>
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button size="small" @click="onDetail(scope.row)">查看详情</el-button>
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

<style scoped>

</style>