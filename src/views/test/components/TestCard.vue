<script setup>
import {toRef, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: '测试卡片'
  },
  content: {
    type: Object,
    default: () => {
      return {
        head: 'Section One',
        body: ['Start', 'Middle', 'End'],
        foot: {
          top: 1,
          bottom: 2
        }
      }
    }
  }
})

const data = toRef(props, 'content')

const count = ref(0)
const changeData = () => {
  data.value.head = count.value++
}

</script>

<template>
  <div class="test-card">
    <div v-pre>{{ this will display ${title} by source }} </div>
    <h1>{{ title }}</h1>

    <div class="card-body">
      <div>{{ data.head }}</div>
      <div>{{ data.body }}</div>
      <div>{{ data.foot }}</div>
    </div>

    <span>{{ data }}</span>

  </div>

  <el-button @click="changeData">修改data</el-button>
</template>

<style lang="less" scoped>
.test-card {
  height: 200px;
  border: 1px solid;

  .card-body {
    height: 100px;
    display: flex;
    flex-direction: column;
  }

  .card-body > div {
    flex: 1;
  }
}
</style>