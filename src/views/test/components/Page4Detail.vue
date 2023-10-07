<script setup>
import {ref, toRef, computed, reactive} from "vue";

const modelForm = ref(null)
// 传参
const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  },
  model: {
    type: Object,
    required: true
  }
})

// 表单接收模型
const formModel = toRef(props, "model")

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})

const showFlag = ref(false);

const title = computed(() => {
  return props.addFlag ? "添加角色" : "修改角色";
})

const handleClose = () => {
  showFlag.value = false;
}

const handleOpen = () => {
  showFlag.value = true;
}

const $emit = defineEmits(['onSubmit'])

const onSubmit = () => {
  // todo 提交表单
  $emit('onSubmit', {...formModel.value})
  handleClose()
}

// 暴露表单组件接口
defineExpose({
  handleOpen
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
        ref="modelForm"
        label-position="right"
        label-width="100px"
        :model="formModel"
        :rules="roleRules"
        style="max-width: 460px"
    >
      <el-form-item label="项目一" prop="item1">
        <el-input v-model="formModel.item1"/>
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