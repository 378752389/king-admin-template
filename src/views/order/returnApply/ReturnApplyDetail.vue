<script setup>

import {computed, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import SectionTitle from "@/components/SectionTitle.vue";
import {getReturnApplyDetailApi} from "@/api/order/returnApply";
import {ElMessage} from "element-plus";

// ============================== 属性 =======================================

const modelObj = reactive({
  returnPackage: [],
  orderInfo: {
    orderNo: '',
    status: '',
    applyTime: '',
    account: '',
    contactName: '',
    tel: '',
    reason: '',
    description: '',
    pics: []
  },
  operatesInfo: [
    {
      operateBy: '',
      operateTime: '',
      remark: ''
    }
  ],
})

// ------ 数据加载状态 -------
const loadStatus = ref(false)

// ----- 商品总价计算 ------
const totalPrice = computed(() => {
  let sumPrice = 0;
  modelObj.returnPackage.forEach(x => {
    sumPrice += Math.floor(x.amount * x.num * 100) / 100
  })
  return sumPrice;
})

// ----- 图片预览 ------
const previewImageSrc = ref('')
const previewDialog = ref(false)


const route = useRoute()

// ==============================  事件监听 =======================================
const onPreview = (src) => {
  previewImageSrc.value = src
  previewDialog.value = true
}

// ==============================  钩子 =======================================
onMounted(async () => {
  const id = route.query.id
  loadStatus.value = true
  try {
    const resp = await getReturnApplyDetailApi(id)
    if (resp.data) {
      modelObj.returnPackage = resp.data.returnPackage
      modelObj.orderInfo = resp.data.orderInfo
      modelObj.operatesInfo = resp.data.operatesInfo
    }
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    loadStatus.value = false
  }

})

</script>

<template>
  <div class="return-apply-detail-page">

    <el-card class="form-card" shadow="never">
      <SectionTitle title="退货商品"/>

      <el-table :data="modelObj.returnPackage" v-loading="loadStatus" border>
        <el-table-column type="index" label="序号" width="80"/>
        <el-table-column label="商品图片">
          <template #default="scope">
            <el-image :src="scope.row.pic" style="width: 100px; height: 100px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column label="退货价格">
          <template #default="scope">
            ￥{{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="num" label="退货数量"/>

        <el-table-column label="小计">
          <template #default="scope">
            ￥{{ Math.floor(scope.row.amount * scope.row.num * 100) / 100 }}
          </template>
        </el-table-column>
      </el-table>

      <div class="total-price">
        合计：<span>￥{{ totalPrice }}</span>
      </div>

    </el-card>

    <el-card class="form-card" shadow="never">

      <SectionTitle title="订单信息"/>

      <el-descriptions
          direction="horizontal"
          :column="1"
          border>

        <el-descriptions-item width="50" label="订单号">{{ modelObj.orderInfo.orderNo }}</el-descriptions-item>
        <el-descriptions-item width="50" label="申请状态">{{ modelObj.orderInfo.status }}</el-descriptions-item>
        <el-descriptions-item width="50" label="申请时间">{{ modelObj.orderInfo.applyTime }}</el-descriptions-item>
        <el-descriptions-item width="50" label="用户账号">{{ modelObj.orderInfo.account }}</el-descriptions-item>
        <el-descriptions-item width="50" label="联系人">{{ modelObj.orderInfo.contactName }}</el-descriptions-item>
        <el-descriptions-item width="50" label="电话号码">{{ modelObj.orderInfo.tel }}</el-descriptions-item>
        <el-descriptions-item width="50" label="退款原因">{{ modelObj.orderInfo.reason }}</el-descriptions-item>
        <el-descriptions-item width="50" label="问题描述">{{ modelObj.orderInfo.description }}</el-descriptions-item>
        <el-descriptions-item width="50" label="凭证图片">
          <el-image class="preview return-image" :key="pic" :src="pic"
                    @click="onPreview(pic)"
                    v-for="pic in modelObj.orderInfo.pics"/>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
          direction="horizontal"
          :column="1"
          :key="operateInfo"
          v-for="operateInfo in modelObj.operatesInfo"
          border>

        <el-descriptions-item label="操作人">{{ operateInfo.operateBy }}</el-descriptions-item>
        <el-descriptions-item label="操作时间">{{ operateInfo.operateTime }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ operateInfo.remark }}</el-descriptions-item>

      </el-descriptions>

      <el-dialog
          width="30%"
          v-model="previewDialog">
        <el-image style="width: 100%" :src="previewImageSrc"/>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped>
.total-price {
  float: right;
  margin-top: 10px;
  line-height: 50px;
  height: 50px;

  > span {
    color: #ff4949;
  }
}

:deep(.el-card__body) {
  overflow: hidden;
}

.el-descriptions {
  margin: 20px 0;
}

.preview {
  cursor: pointer;
}

.return-image {
  width: 50px;
  height: 50px;
  margin: 0 5px;
}

</style>