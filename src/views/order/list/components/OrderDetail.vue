<script setup>
import {reactive, ref, onMounted} from 'vue';
import SectionTitle from "@/components/SectionTitle.vue";
import {getOrderDetailApi} from "@/api/order/list";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRoute} from "vue-router";

// ========================= 属性 ================================

const messageModel = reactive({
  title: '',
  content: '',
  phone: ''
})

const remarkModel = reactive({
  remark: ''
})

const modelObj = reactive({
  id: 0,
  orderNo: '',
  payType: 0,
  payTime: '',
  status: 0,
  remark: '',
  source: 0,
  type: 0,

  promotionAmount: 0,
  totalAmount: 0,
  payAmount: 0,

  couponId: '',
  couponName: '',
  couponAmount: 0,

  useIntegration: '',
  integrationAmount: 0,
  integration: '',

  memberId: 0,
  memberName: '',

  packageList: [],

  operateHistory: [{
    operateBy: '',
    createTime: '',
    orderStatus: '',
    description: ''
  }]
})

const sendMessageVisible = ref(false)
const remarkVisible = ref(false)

// ========================= 方法 ================================

const loadDetail = async () => {
  const route = useRoute()
  const id = route.query.id

  const resp = await getOrderDetailApi(id)
  if (resp && resp.data) {
    let data = resp.data
    modelObj.id = data.id
    modelObj.orderNo = data.orderNo
    modelObj.payType = data.payType
    modelObj.payTime = data.payTime
    modelObj.status = data.status
    modelObj.remark = data.remark
    modelObj.source = data.source
    modelObj.type = data.type
    modelObj.promotionAmount = data.promotionAmount
    modelObj.totalAmount = data.totalAmount
    modelObj.payAmount = data.payAmount
    modelObj.couponId = data.couponId
    modelObj.couponName = data.couponName
    modelObj.couponAmount = data.couponAmount
    modelObj.useIntegration = data.useIntegration
    modelObj.integrationAmount = data.integrationAmount
    modelObj.integration = data.integration
    modelObj.memberId = data.memberId
    modelObj.memberName = data.memberName
    modelObj.packageList = data.packageList
    modelObj.operateHistory = data.operateHistory

    // 消息发送手机号
    messageModel.phone = data.phone
  }


}

// ========================= 事件 ================================


const onDinner = () => {
  ElMessageBox.confirm(
      '请确认是否出餐',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 出餐
    ElMessage.success('出餐成功')
  }).catch(() => {
    ElMessage.info("操作取消")
  })
}

const onCancelOrder = () => {

  ElMessageBox.confirm(
      '请确认是否取消',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 取消订单
    ElMessage.success('订单取消成功')
  }).catch(() => {
    ElMessage.info("订单未取消")
  })
}
const onSendMessage = () => {
  sendMessageVisible.value = true
}

const onSendMessageClose = () => {
  messageModel.title = ""
  messageModel.content = ""
  sendMessageVisible.value = false
}

const onSendMessageConfirm = () => {
  ElMessageBox.confirm(
      '请确认是否发送消息',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 发送消息
    console.log(messageModel)
    ElMessage.success('消息发送成功')
  }).catch(() => {
    ElMessage.info("消息取消发送")
  })


}

const onRemarkOrder = () => {
  remarkVisible.value = true
}
const onRemarkOrderClose = () => {
  remarkModel.remark = ''
  remarkVisible.value = false
}

const onRemarkOrderConfirm = () => {
  ElMessageBox.confirm(
      '请确认是否添加订单备注信息',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 添加订单备注信息
    console.log(messageModel)
    ElMessage.success('订单备注成功')
  }).catch(() => {
    ElMessage.info("订单取消备注")
  })
}
// ========================= 钩子 ================================

onMounted(async () => {
  await loadDetail()
})

</script>

<template>
  <div class="order-detail-page">
    <el-card class="form-card" shadow="never">

      <el-steps class="section order-status" :active="modelObj.status" finish-status="success" align-center>
        <el-step title="提交订单"/>
        <el-step title="支付订单"/>
        <el-step title="出餐"/>
        <el-step title="评价"/>
      </el-steps>

      <div class="section order-basic">
        <section-title title="订单基本信息">
          <template #default>
            <el-button @click="onDinner" v-if="modelObj.status === 2">出餐</el-button>
            <el-button @click="onSendMessage" v-if="modelObj.status > 1">发送消息</el-button>
            <el-button @click="onCancelOrder" v-if="modelObj.status <= 2">取消订单</el-button>
            <el-button @click="onRemarkOrder">备注订单</el-button>
          </template>
        </section-title>

        <el-descriptions :column="4" direction="vertical" border size="large">
          <el-descriptions-item
              label="订单编号"
              label-align="center"
              align="center">
            {{ modelObj.orderNo }}
          </el-descriptions-item>
          <el-descriptions-item label="用户账号" label-align="center" align="center">
            {{ modelObj.memberName }}
          </el-descriptions-item>
          <el-descriptions-item label="支付方式" label-align="center" align="center">
            <el-tag type="success" v-if="modelObj.payType === 1">微信支付</el-tag>
            <el-tag v-else-if="modelObj.payType === 2">支付宝支付</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="支付时间" label-align="center" align="center">
            {{ modelObj.payTime }}
          </el-descriptions-item>
          <el-descriptions-item label="订单来源" label-align="center" align="center">
            <span v-if="modelObj.source === 1">APP</span>
          </el-descriptions-item>
          <el-descriptions-item label="订单类型" label-align="center" align="center">
            <span v-if="modelObj.type === 1">正常订单</span>
          </el-descriptions-item>
          <el-descriptions-item label="自动确认订单完成时间" label-align="center" align="center">
            1小时
          </el-descriptions-item>
          <el-descriptions-item label="活动信息" label-align="center" align="center">
            无优惠
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="section food-list">
        <section-title title="商品列表"></section-title>

        <el-table :data="modelObj.packageList" border header-cell-class-name="custom-header">
          <el-table-column width="130" label="套餐图片">
            <template #default="scope">
              <el-image :src="scope.row.packagePic" style="width: 100px; height: 100px;"/>
            </template>
          </el-table-column>
          <el-table-column prop="packageName" label="套餐名称" show-overflow-tooltip/>
          <el-table-column prop="packagePrice" label="套餐价格"/>
          <el-table-column prop="extra" label="属性"/>
          <el-table-column prop="packageNum" label="数量"/>
        </el-table>
      </div>

      <div class="section amount-list">
        <section-title title="费用信息"></section-title>

        <el-descriptions :column="3" direction="vertical" border size="large">
          <el-descriptions-item label="优惠券" label-align="center" align="center">
            - ￥{{ modelObj.couponAmount }}
          </el-descriptions-item>
          <el-descriptions-item label="积分抵扣" label-align="center" align="center">
            - ￥{{ modelObj.integrationAmount }}
          </el-descriptions-item>
          <el-descriptions-item label="促销优惠" label-align="center" align="center">
            - ￥{{ modelObj.promotionAmount }}
          </el-descriptions-item>
          <el-descriptions-item
              label="套餐合计" label-align="center" align="center">
            ￥{{ modelObj.totalAmount }}
          </el-descriptions-item>
          <el-descriptions-item label="订单总金额" label-align="center" align="center">
            <span class="high-light">￥{{ modelObj.totalAmount }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="支付金额" label-align="center" align="center">
            <span class="high-light"> ￥{{ modelObj.payAmount }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="section operate-list">
        <section-title title="操作列表"></section-title>

        <el-table :data="modelObj.operateHistory" border header-cell-class-name="custom-header">
          <el-table-column prop="operateBy" label="操作人"/>
          <el-table-column prop="createTime" label="操作时间"/>
          <el-table-column prop="orderStatus" label="订单状态"/>
          <el-table-column prop="description" label="备注"/>
        </el-table>

      </div>

    </el-card>

    <!--   ==================================================== 弹窗  ===============================================-->
    <el-dialog
        class="send-message-dialog"
        v-model="sendMessageVisible"
        title="发送消息"
        width="40%"
        :before-close="onSendMessageClose">

      <el-form v-model="messageModel">
        <el-form-item label-width="120" label="标题">
          <el-input size="large" style="width: 300px" v-model="messageModel.title"/>
        </el-form-item>
        <el-form-item label-width="120" label="内容">
          <el-input size="large" rows="5" v-model="messageModel.content" type="textarea"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onSendMessageClose">取消</el-button>
          <el-button type="primary" @click="onSendMessageConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
        class="remark-dialog"
        v-model="remarkVisible"
        title="订单备注"
        width="40%"
        :before-close="onRemarkOrderClose">

      <el-form v-model="remarkModel">
        <el-form-item label-width="120" label="备注">
          <el-input size="large" rows="5" v-model="remarkModel.remark" type="textarea"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onRemarkOrderClose">取消</el-button>
          <el-button type="primary" @click="onRemarkOrderConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>

.section {
  margin: 30px 0;
}

.high-light {
  color: red;
}

</style>