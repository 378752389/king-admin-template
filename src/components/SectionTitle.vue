<script setup>
import SvgIcon from "@/components/SvgIcon.vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    default: 'black'
  },
  barColor: {
    type: String,
    default: '#304156'
  },
  icon: {
    type: String
  }
})
</script>

<template>
  <div class="section-title">
    <div class="left">
      <h2>{{ title }} </h2>
      <SvgIcon v-if="icon" :icon="icon"/>
    </div>

    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.section-title {
  display: flex;
  margin-bottom: 20px;

  .left {
    display: flex;
    align-items: center;
    line-height: 40px;
    flex: 1;

    &::before {
      content: "";
      display: block;
      width: 10px;
      height: 40px;
      background-color: v-bind(barColor);
      margin-right: 15px;
    }

    h2 {
      color: v-bind(textColor);
      margin-right: 5px;
    }

    .el-icon {
      font-size: 26px;
    }
  }

  .right {
    margin: 0 auto;
  }
}
</style>