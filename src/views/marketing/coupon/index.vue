<script setup>
import {onMounted, reactive, ref} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {getCouponPage} from "@/api/marketing/coupon";

// ============================== 属性 =======================================

// -------搜索--------
const searchForm = reactive({
  name: '',
  startTime: '',
  endTime: ''
})
const searchRules = reactive({
  name: [],
  startTime: [],
  endTime: [],
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

const onEdit = async (row) => {
  const id = row.id
  console.log(id)
  await router.push({
    name: 'coupon-update',
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
    // todo getPageApi
    const resp = await getCouponPage({
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
  <div class="coupon-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef"
               :inline="true"
               :rules="searchRules"
               :model="searchForm">
        <el-form-item label="广告名" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="输入广告名"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              placeholder="选择广告开始时间"
              value-format="YYYY-MM-DD"
              v-model="searchForm.startTime"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
              placeholder="选择广告结束时间"
              value-format="YYYY-MM-DD"
              v-model="searchForm.endTime"/>
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
        <el-table-column prop="name" label="优惠券名称"/>
        <el-table-column prop="type" label="优惠券类型"/>
        <el-table-column prop="amount" label="面值"/>

        <el-table-column prop="effectiveTime" label="开始时间"/>
        <el-table-column prop="expireTime" label="结束时间"/>

        <el-table-column prop="description" label="描述" show-overflow-tooltip/>
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

<style scoped>

</style>