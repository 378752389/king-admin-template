<script setup>
import {ref, computed, reactive} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

// ============================== 传参 =======================================
const props = defineProps({
  addFlag: {
    type: Boolean
  }
})

const emit = defineEmits(['onSubmit'])

// ============================== 属性 =======================================

const showFlag = ref(false);

const modelObj = reactive({
  id: '',
  sort: 1,
  name: '',
  icon: '',
  type: '',
  publish: 0,
})
// 表单规则校验
const rules = reactive({
  id: [],
  roleName: [],
  createTime: []
})

// ------ 图标预览 ---------
const previewIcon = computed(() => {
  return 'king-' + modelObj.icon;
})

const title = computed(() => {
  return props.addFlag ? "添加分类" : "修改分类";
})

// ============================== 事件 =======================================


const handleClose = () => {
  showFlag.value = false;
}

const handleOpen = (row) => {
  // 解决修改表单但为提交数据，导致表格内容任然被修改，刷新后才能复原问题
  modelObj.id = row.id;
  modelObj.sort = row.sort;
  modelObj.name = row.name;
  modelObj.publish = row.publish;
  modelObj.icon = row.icon;
  modelObj.type = row.type;

  showFlag.value = true;
}

const onSubmit = () => {
  // todo 提交表单
  emit('onSubmit', modelObj)
  handleClose()
}

// 暴露打开弹窗操作
defineExpose({
  handleOpen,
  handleClose
})

</script>

<template>
  <div class="category-detail-page">
    <el-dialog
        v-model="showFlag"
        :title="title"
        width="30%"
        :before-close="handleClose">
      <!--   todo 表单内容-->
      <el-form
          label-position="right"
          label-width="100px"
          :model="modelObj"
          :rules="rules"
          style="max-width: 460px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="modelObj.name"/>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select
              v-model="modelObj.type"
              placeholder="类别"
              clearable>
            <el-option label="套餐" :value="1"/>
            <el-option label="商品" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="分类排序" prop="sort">
          <el-input v-model="modelObj.sort"/>
        </el-form-item>
        <el-form-item label="分类图标 " prop="icon">
          <el-input v-model="modelObj.icon">
            <template #append>
              <SvgIcon :icon="previewIcon"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="发布状态" prop="publish">
          <el-switch :active-value="1"
                     :inactive-value="0"
                     v-model="modelObj.publish" />
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>