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
import {ref, onMounted} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";

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
const checkList = ref(props.modelValue || [])

const currentTab = ref(1)
const tableData = ref([])

const onDelete = (row) => {
  const id = row.id
  const idx1 = checkList.value.indexOf(id)
  checkList.value.splice(idx1, 1)
  const idx2 = tableData.value.findIndex(x => x.id === id)
  tableData.value.splice(idx2, 1)
}

const renderTableData = () => {
  const res = []
  for (let category of props.data) {
    for (let item of category.children) {
      if (checkList.value.indexOf(item.id) !== -1) {
        res.push(item)
      }
    }
  }
  tableData.value = res
}

const onChange = () => {
  renderTableData()
  $emit('update:modelValue', checkList.value)
}

onMounted(async () => {
  console.log(checkList.value)
  renderTableData()
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
        <el-checkbox-group v-model="checkList">
          <el-checkbox
              @change="onChange"
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