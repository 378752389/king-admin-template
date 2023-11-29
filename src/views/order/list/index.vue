<script setup>
import {onMounted, reactive, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {getOrderPageApi} from "@/api/order/list";

// ============================== 属性 =======================================

// -------搜索--------
const searchForm = reactive({
  orderNo: '',
  contact: '',
  createTime: '',
  status: '',
})
const searchRules = reactive({
  orderNo: [],
  contact: [],
  createTime: [],
  status: [],
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

const onAdd = async () => {
  await router.push({
    name: 'coupon-add'
  })
}

const onDetail = async (row) => {
  const id = row.id
  console.log(id)
  await router.push({
    name: 'order-detail',
    query: {
      id
    }
  })
}

const onDelete = async (row) => {
  const id = row.id;

  try {
    // todo deleteApi
    const res = await Promise.resolve(id)
    ElMessage.success(res.message)
    await loadData()
  } catch (e) {
    ElMessage.error(e)
  }
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
    const resp = await getOrderPageApi({
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
  <div class="order-page">
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
              placeholder="输入广告名"/>
        </el-form-item>

        <el-form-item label="订单状态" prop="status">
          <el-input
              v-model="searchForm.status"
              placeholder="全部"/>
        </el-form-item>

        <el-form-item label="收货人" prop="contact">
          <el-input
              v-model="searchForm.contact"
              placeholder="收货人姓名/电话号码"/>
        </el-form-item>

        <el-form-item label="订单创建时间" prop="createTime">
          <el-date-picker
              placeholder="选择时间"
              value-format="YYYY-MM-DD"
              v-model="searchForm.createTime"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <SectionTitle title="数据列表"/>

      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="loadStatus" border header-cell-class-name="custom-header">

        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="orderNo" width="230" label="订单号"/>
        <el-table-column prop="createTime" label="订单创建时间"/>
        <el-table-column prop="account" label="账号"/>
        <el-table-column prop="amount" label="订单金额"/>

        <el-table-column prop="payWay" label="支付方式"/>
        <el-table-column prop="status" label="订单状态"/>

        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button size="small" @click="onDetail(scope.row)">订单详情</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
              <template #reference>
                <el-button type="danger" size="small">删除订单</el-button>
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

<style scoped>

</style>