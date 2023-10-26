<script setup>
import {ref} from 'vue';
import SectionTitle from "@/components/SectionTitle.vue";

const initModel = {
  status: 1,
  productList: [
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    }, {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    }, {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
    {
      productPic: '',
      productName: '汉堡包',
      price: 200,
      num: 1,
    },
  ],
  totalPrice: 200,
  operateHistory: [
    {
      operator: 'king',
      operateTime: '2023-10-07 11:11:11',
      operateLog: '发货',
      remark: '客户说要延迟发货'
    }
  ]
}

const orderModel = ref(initModel)

</script>

<template>
  <div class="order-page">
    <!--<h1>订单页面</h1>-->
    <el-card>

      <el-steps class="section order-status" :active="orderModel.status" finish-status="success" align-center>
        <el-step title="提交订单"/>
        <el-step title="支付订单"/>
        <el-step title="确认收货"/>
        <el-step title="完成评价"/>
      </el-steps>

      <div class="section order-basic">
        <section-title title="订单基本信息"></section-title>

        <el-descriptions :column="3" border size="large">
          <el-descriptions-item
              label="订单编号"
              label-align="right"
              align="center"
              label-class-name="my-label">
            202006270100000001
          </el-descriptions-item>
          <el-descriptions-item label="用户账号" label-align="right" align="center">
            king
          </el-descriptions-item>
          <el-descriptions-item label="支付方式" label-align="right" align="center">
            微信支付
          </el-descriptions-item>
          <el-descriptions-item label="订单来源" label-align="right" align="center">
            <el-tag size="small">APP</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="订单类型" label-align="right" align="center">
            正常订单
          </el-descriptions-item>
          <el-descriptions-item label="配送方式" label-align="right" align="center">
            无
          </el-descriptions-item>
          <el-descriptions-item label="自动确认订单完成时间" label-align="right" align="center">
            1小时
          </el-descriptions-item>
          <el-descriptions-item label="活动信息" label-align="right" align="center">
            无优惠
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="section food-list">
        <section-title title="商品列表"></section-title>

        <el-table :data="orderModel.productList">
          <el-table-column prop="productPic" label="商品图片" width="180"/>
          <el-table-column prop="productName" label="商品名称" width="180"/>
          <el-table-column prop="price" label="商品价格"/>
          <el-table-column prop="num" label="商品数量"/>
        </el-table>
      </div>

      <div class="section operate-list">
        <section-title title="操作列表"></section-title>

        <el-table :data="orderModel.operateHistory">
          <el-table-column prop="operator" label="操作人" width="200"/>
          <el-table-column prop="operateTime" label="操作时间" width="200"/>
          <el-table-column prop="operateLog" label="操作内容" width="200"/>
          <el-table-column prop="remark" label="备注"/>
        </el-table>

      </div>

    </el-card>
  </div>
</template>

<style lang="less" scoped>

.section {
  margin: 30px 0;
}

.section-title {
  margin-bottom: 20px;
}

</style>