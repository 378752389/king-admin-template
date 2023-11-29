<script setup>
import {ref, onMounted, reactive, computed} from "vue";
import {useRoute} from "vue-router";
import {getCouponRecordDetailApi} from "@/api/marketing/coupon";

// ==============================  属性 =======================================

const searchForm = reactive({
  orderNo: '',
  useStatus: '',
  memberNickname: ''
})

const searchRule = reactive({
  orderNo: [],
  useStatus: [],
  memberNickname: []
})

// -------分页--------
const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const searchFormRef = ref(null)

const modelObj = reactive({
  id: 0,
  name: '',
  type: '',
  releaseNum: 0,
  limitNum: '',
  amount: 10,
  enableTime: '',
  thresholdAmount: 100,
  effectiveTime: '',
  expireTime: '',
  remark: '',

  receiveNum: 0,
  useNum: 0,
  status: '已过期',

  couponRecordList: []
})

const nonReceiveNum = computed(() => {
  return modelObj.releaseNum - modelObj.receiveNum
})

const nonUseNum = computed(() => {
  return modelObj.releaseNum - modelObj.useNum
})

const route = useRoute()

// ==============================  事件 =======================================

const onSearch = async () => {
  await loadData()
}

const onReset = () => {
  searchFormRef.value.resetFields();
}

const pageNumChange = async (pageNum) => {
  pageData.pageNum = pageNum
  await loadData()
}
const pageSizeChange = async (pageSize) => {
  pageData.pageSize = pageSize
  await loadData()
}

const loadData = async () => {
  const id = route.query.id
  const resp = await getCouponRecordDetailApi(id,
      {
        pageNum: pageData.pageNum,
        pageSize: pageData.pageSize,
        ...searchForm.value
      })

  // todo
  if (resp && resp.code === 200) {
    let data = resp.data

    modelObj.id = data.coupon.id
    modelObj.name = data.coupon.name
    modelObj.type = data.coupon.type
    modelObj.releaseNum = data.coupon.releaseNum
    modelObj.limitNum = data.coupon.limitNum
    modelObj.amount = data.coupon.amount
    modelObj.enableTime = data.coupon.enableTime
    modelObj.thresholdAmount = data.coupon.thresholdAmount
    modelObj.effectiveTime = data.coupon.effectiveTime
    modelObj.expireTime = data.coupon.expireTime
    modelObj.remark = data.coupon.remark
    modelObj.receiveNum = data.coupon.receiveNum
    modelObj.useNum = data.coupon.useNum
    modelObj.status = data.coupon.status

    modelObj.couponRecordList = data.couponRecordList.dataList
    pageData.pageSize = data.couponRecordList.pageSize
    pageData.pageNum = data.couponRecordList.pageNum
    pageData.total = data.couponRecordList.total
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <div class="coupon-record-detail-page">
    <el-card shadow="never">
      <el-descriptions
          :column="5"
          direction="vertical"
          size="large"
          border
      >
        <el-descriptions-item label="名称">
          {{ modelObj.name }}
        </el-descriptions-item>

        <el-descriptions-item label="使用门槛">
          满 {{ modelObj.thresholdAmount }} 元可用
        </el-descriptions-item>

        <el-descriptions-item label="面值">
          {{ modelObj.amount }} 元
        </el-descriptions-item>

        <el-descriptions-item label="状态">
          {{ modelObj.status }}
        </el-descriptions-item>

        <el-descriptions-item label="有效期">
          {{ modelObj.expireTime }} - {{ modelObj.expireTime }}
        </el-descriptions-item>

        <el-descriptions-item label="发行量">
          {{ modelObj.releaseNum }}
        </el-descriptions-item>

        <el-descriptions-item label="已领取">
          {{ modelObj.receiveNum }}
        </el-descriptions-item>

        <el-descriptions-item label="待领取">
          {{ nonReceiveNum }}
        </el-descriptions-item>

        <el-descriptions-item label="已使用">
          {{ modelObj.useNum }}
        </el-descriptions-item>

        <el-descriptions-item label="待使用">
          {{ nonUseNum }}
        </el-descriptions-item>

      </el-descriptions>

      <el-divider/>

      <el-form ref="searchFormRef"
               :inline="true"
               :rules="searchRule"
               :model="searchForm">

        <el-form-item label="会员名称" prop="memberNickname">
          <el-input
              v-model="searchForm.memberNickname"
              placeholder="输入会员名称"/>
        </el-form-item>

        <el-form-item label="订单号" prop="orderNo">
          <el-input
              v-model="searchForm.orderNo"
              placeholder="输入订单号"/>
        </el-form-item>

        <el-form-item label="使用状态" prop="useStatus">
          <el-select
              v-model="searchForm.useStatus"
              placeholder="选择优惠券使用状态">
            <el-option :value="0" label="未使用"/>
            <el-option :value="1" label="已使用"/>
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="modelObj.couponRecordList" border header-cell-class-name="custom-header">
        <el-table-column label="会员昵称" prop="memberNickname"/>
        <el-table-column label="领取方式">
          <template #default="scope">
            <span v-if="scope.row.getType === 1">主动领取</span>
            <span v-if="scope.row.getType === 2">系统赠予</span>
          </template>
        </el-table-column>
        <el-table-column label="领取时间" prop="createTime" align="center"/>
        <el-table-column label="使用状态" align="center">
          <template #default="scope">
            <span v-if="scope.row.useStatus === 0">未使用</span>
            <span v-if="scope.row.useStatus === 1">已使用</span>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" align="center">
          <template #default="scope">
            <span v-if="scope.row.useTime">{{scope.row.useTime}}</span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderNo"/>
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