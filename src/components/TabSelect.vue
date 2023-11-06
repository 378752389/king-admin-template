<script setup>
/**
 * 组件模型数据
 * const data = [
 *   {
 *     id: 1                  // 目录标识
 *     label: '汉堡',          // 目录标签
 *     content: [             // 标签内容
 *       {
 *         pic: ''            // 标签绑定图片
 *       }
 *     ]
 *   }
 * ]
 */
import {ref, onMounted, watch, toRef} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";
import {useVModel} from "@vueuse/core";

// ============================== 传参 =======================================

const props = defineProps({
  width: {
    type: String,
    default: '100px'
  },
  height: {
    type: String,
    default: '100px'
  },
  modelValue: {
    type: Array
  },
  data: {
    type: Array
  }
})

const $emit = defineEmits(['update:modelValue'])

// ============================== 属性 =======================================

// ------ 组件属性双向绑定 -----
const idArr = useVModel(props, "modelValue", $emit)

const currentTab = ref(1)

const tableData = ref([])


// ============================== 事件 =======================================

const onDelete = (row) => {
  const id = row.id

  // 移除组件双向绑定模型数据
  const idx1 = idArr.value.indexOf(id)
  idArr.value.splice(idx1, 1)

  // 移除表格绑定模型数据
  tableData.value = tableData.value.filter(item => item.id !== id)
}

/**
 * watch 只能侦听 函数、ref、reactvie 中的一种，因此需要将 props 转化为函数才能侦听到
 */
watch([idArr, () => props.data], ([arr, data]) => {
  const res = []
  for (let category of data) {
    for (let item of category.children) {
      if (arr.indexOf(item.id) !== -1) {
        res.push(item)
      }
    }
  }
  tableData.value = res
}, {immediate: true})



onMounted(() => {

})

</script>

<template>
  <div class="tab-select">
    <el-tabs
        v-model="currentTab"
        type="card">
      <el-tab-pane
          v-for="item in data"
          :key="item.id"
          :label="item.name"
          :name="item.id">
        <!--          name 和 currentTab 会进行绑定-->
        <el-checkbox-group v-model="idArr">
          <el-checkbox
              :key="product.id"
              :label="product.id"
              v-for="product in item.children">
            <template #default>
              <el-image style="width: 100px; height: 100px;" :src="product.pic"/>
            </template>
          </el-checkbox>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border height="320">
      <slot>
        <el-table-column label="id" prop="id"/>
        <el-table-column label="图片" prop="pic"/>
      </slot>
      <el-table-column label="操作">
        <template #default="scope">
          <el-link @click="onDelete(scope.row)" :underline="false">
            <SvgIcon style="font-size: 20px;" :icon="'king-close'"/>
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>
.tab-select {
  flex: 1;
}

.el-image {
  width: v-bind(width);
  height: v-bind(height);

  &:hover {
    outline: 1px solid blue;
  }
}

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

.el-table {
  margin: 10px 0;
}
</style>