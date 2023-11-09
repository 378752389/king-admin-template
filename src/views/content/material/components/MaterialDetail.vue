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
  id: []
})

const modelObj = reactive({
  id: 0,
  name: '',
  pic: '',
  description: '',
  publish: 0
})

const showFlag = ref(false)

const title = computed(() => {
  return props.addFlag ? "添加物料" : "修改物料";
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
    $emit('onSubmit', {...modelObj})
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消提交',
    })
  })
}


// ============================== 开放接口 =======================================

const handleClose = () => {
  showFlag.value = false;
}

const handleOpen = (row) => {
  modelObj.id = row.id
  modelObj.name = row.name
  modelObj.publish = row.publish
  modelObj.pic = row.pic
  modelObj.description = row.description

  showFlag.value = true;
}

defineExpose({
  handleOpen,
  handleClose
})

</script>

<template>
  <div class="material-detail">
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
          style="max-width: 460px">

        <el-form-item label="名称" prop="name">
          <el-input v-model="modelObj.name"/>
        </el-form-item>

        <el-form-item label="图片" prop="pic">
          <el-input v-model="modelObj.pic"/>
        </el-form-item>


        <el-form-item label="描述" prop="description">
          <el-input v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item label="发布状态" prop="publish">
          <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="modelObj.publish"/>
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