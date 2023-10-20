<script setup>
import {ref} from 'vue'

defineProps({
  modelValue: {
    type: Array,
  }
})
const $emit = defineEmits(['update:modelValue'])
const checkList = ref([])
const entityArr = ref([
  {
    id: 1,
    pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 2,
    pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 3,
    pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
])
const onChange = () => {
  $emit('update:modelValue', checkList.value)
}
</script>

<template>
  <div style="height: 100px"></div>
  <el-checkbox-group v-model="checkList">
    <el-checkbox
        @change="onChange"
        :key="entity.id"
        :label="entity.id"
        v-for="entity in entityArr">
      <template #default>
        <el-image style="width: 100px; height: 100px;" :src="entity.pic"/>
      </template>
    </el-checkbox>
  </el-checkbox-group>
</template>

<style lang="less" scoped>
.el-checkbox-group {
  display: flex;

  .el-checkbox {
    display: block;
    position: relative;
    height: 100px;
    margin: 10px;

    &:deep(.el-checkbox__label) {
      padding: 0;
    }

    &:deep(.el-checkbox__input) {
      display: block;
      position: absolute;
      left: 5px;
      top: 5px;
    }
  }
}
</style>