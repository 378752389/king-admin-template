<script setup>
import {ref, computed, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

// ============================== 传参 =======================================
const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['onSubmit'])

// ============================== 属性 =======================================

// ----- dialog 显示状态 ------
const showFlag = ref(false);

const modelObj = reactive({
  id: '',
  reason: '',
  sort: '',
  enable: '',
  createTime: ''
})

const rules = reactive({
  reason: [],
  sort: [],
  enable: []
})

const title = computed(() => {
  return props.addFlag ? "添加退货原因" : "修改退货原因";
})

// ============================== 事件监听 =======================================

const handleSubmit = () => {
  ElMessageBox.confirm(
      '请确认是否提交？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    emit('onSubmit', {...modelObj})
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消提交',
    })
  })
}

// ============================== 暴露方法 =======================================

const handleClose = () => {
  showFlag.value = false;
}

const handleOpen = (row) => {
  modelObj.id = row.id;
  modelObj.publish = row.publish;
  modelObj.sort = row.sort;
  modelObj.createTime = row.createTime;
  modelObj.name = row.name;

  showFlag.value = true;
}

defineExpose({
  handleOpen,
  handleClose
})

</script>

<template>
  <el-dialog
      v-model="showFlag"
      :title="title"
      width="30%"
      :before-close="handleClose">

    <el-form
        label-position="right"
        label-width="100px"
        :model="modelObj"
        :rules="rules">

      <el-form-item label="退货原因" prop="reason">
        <el-input v-model="modelObj.name"/>
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input v-model="modelObj.sort"/>
      </el-form-item>

      <el-form-item label="是否启用" prop="enable">
        <el-switch v-model="modelObj.publish" :active-value="1" :inactive-value="0"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>