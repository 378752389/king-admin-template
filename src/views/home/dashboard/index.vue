<script setup>

import SvgIcon from "@/components/SvgIcon.vue";
import {ref, onMounted} from "vue";

const res = {
  username: 'admin',
  phone: '18011110000',
  address: '深圳',
  ip: '192.168.1.128',
}

const profileModel = ref([
  {
    label: '用户名',
    prop: 'username',
    icon: 'king-admin',
  },
  {
    label: '联系电话',
    prop: 'phone',
    icon: 'king-iphone',
  },
  {
    label: '地址',
    prop: 'address',
    icon: 'king-location',
  },
  {
    label: 'ip',
    prop: 'ip',
    icon: 'king-tickets',
  }
])

onMounted(() => {
  profileModel.value.map(item => {
    item.value = res[item.prop]
  })
})

</script>

<template>
  <h1>这是一个profiler页面</h1>

  <el-descriptions
      title="面板信息"
      :column="2"
      :size="'large'"
      border
  >

    <el-descriptions-item :key="item.prop" v-for="item in profileModel">
      <template #label>
        <div class="cell-item">
          <SvgIcon :icon="item.icon"/>
          <span class="text">{{ item.label }}</span>
        </div>
      </template>
      {{ item.value }}
    </el-descriptions-item>

  </el-descriptions>
</template>

<style lang="less" scoped>

.el-descriptions {
  margin-top: 20px;

  .cell-item {
    display: flex;
    align-items: center;

    .text {
      margin-left: 10px;
    }
  }
}


</style>