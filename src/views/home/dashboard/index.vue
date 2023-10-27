<script setup>

import SvgIcon from "@/components/SvgIcon.vue";
import {ref, onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useUserInfoStore} from "@/stores/userInfo";

const {info} = storeToRefs(useUserInfoStore());

const profileModel = ref([
  {
    label: '用户名',
    prop: 'username',
    icon: 'king-user',
  },
  {
    label: '联系电话',
    prop: 'phone',
    icon: 'king-iphone',
  },
  {
    label: '邮箱',
    prop: 'email',
    icon: 'king-message',
  },
  // {
  //   label: '性别',
  //   prop: 'gender',
  //   icon: 'king-menu',
  // },
  {
    label: 'qq',
    prop: 'qq',
    icon: 'king-menu',
  },
  {
    label: '微信',
    prop: 'weChat',
    icon: 'king-menu',
  },
  {
    label: '职业',
    prop: 'occupation',
    icon: 'king-service',
  },
  {
    label: '描述',
    prop: 'description',
    icon: 'king-more',
  },
  {
    label: '地址',
    prop: 'address',
    icon: 'king-location',
  },
  {
    label: '最后登录Ip',
    prop: 'lastLoginIp',
    icon: 'king-location',
  },
  {
    label: '最后登录时间',
    prop: 'lastLoginTime',
    icon: 'king-clock',
  },
])

onMounted(() => {
  profileModel.value.map(item => {
    item.value = info.value[item.prop]
  })
})

</script>

<template>
  <div class="dashboard-page">
    <el-card shadow="never">
      <el-descriptions
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
    </el-card>
  </div>
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