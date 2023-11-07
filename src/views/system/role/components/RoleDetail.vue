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

const $emit = defineEmits(['onSubmit'])

// ============================== 属性 =======================================

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})
const modelObj = ref({})
const showFlag = ref(false)

const title = computed(() => {
  return props.addFlag ? "添加角色" : "修改角色";
})

// ============================== 事件 =======================================

const onSubmit = () => {
  ElMessageBox.confirm(
      '请确认是否提交？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    $emit('onSubmit', {...modelObj.value})
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消提交',
    })
  })
}


// ============================== 开放接口 =======================================

const handleClose = () => {
  modelObj.value = {}
  showFlag.value = false;
}

const handleOpen = (row) => {
  modelObj.value = {...row}
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
    <!--   todo 表单内容-->
    <el-form
        label-position="right"
        label-width="100px"
        :model="modelObj"
        :rules="roleRules"
        style="max-width: 460px"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="modelObj.roleName"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>