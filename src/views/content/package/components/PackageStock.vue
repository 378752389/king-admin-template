<script setup>
import {ref, reactive} from 'vue';
import {useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Object
  },
  descriptionObj: {
    type: Object,
    default: function () {
      return {
        totalPrice: 0,
        packageName: '',
        productList: []
      }
    }
  }
})

const emit = defineEmits(["onStockSubmit"])

const modelObj = useVModel(props, 'modelValue', emit)

// ========================= 属性 ================================

const packageStockVisible = ref(false)


// ========================= 事件 ================================
const onClose = () => {
  packageStockVisible.value = false
}

const onOpen = () => {
  packageStockVisible.value = true
}

const onSubmit = () => {
  emit('onStockSubmit', {...modelObj})
}

// ========================= 接口 ================================
defineExpose({
  onOpen,
  onClose
})
</script>

<template>
  <el-dialog
      class="package-stock-dialog"
      v-model="packageStockVisible"
      title="修改套餐库存"
      width="40%"
      :before-close="onClose">

    <el-form v-model="modelObj">
      <el-descriptions
          class="margin-top"
          :column="6"
          direction="vertical"
          size="large"
          border>
        <el-descriptions-item label="套餐名">
          {{ descriptionObj.packageName }}
        </el-descriptions-item>
        <el-descriptions-item width="120" label="总价">
          {{ descriptionObj.totalPrice }}
        </el-descriptions-item>
        <el-descriptions-item width="120" label="促销价">
          <el-input type="number" v-model="modelObj.promotionPrice" style="width: 100px;"/>
        </el-descriptions-item>
        <el-descriptions-item width="120" label="库存">
          <el-input type="number" v-model="modelObj.stock" style="width: 100px;"/>
        </el-descriptions-item>
        <el-descriptions-item width="120" label="库存预警">
          <el-input type="number" v-model="modelObj.lowStock" style="width: 100px;"/>
        </el-descriptions-item>

      </el-descriptions>

      <el-divider/>

      <el-table :data="descriptionObj.productList" border header-cell-class-name="custom-header">
        <el-table-column type="index" align="center" width="120" label="序号"/>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip/>
        <el-table-column prop="price" align="center" label="售价"/>
        <el-table-column prop="stock" width="180" align="center" label="库存"/>
      </el-table>
    </el-form>

    <template #footer>
        <span class="dialog-footer">
          <el-button @click="onClose">取消</el-button>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>