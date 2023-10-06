<script setup>
import {ref, unref, computed, reactive} from "vue";

const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  }
})

const $emit = defineEmits(['onSubmit'])

const initModel = {
  resourceName: '',
  resourceType: 0,
  path: '',
  level: '',
  permission: '',
  parentId: ''
}

// 表单规则校验
const roleRules = reactive({
  resourceName: [],
  resourceType: [],
  path: [],
  level: [],
  permission: [],
  parentId: []
})

const model = ref(initModel)

const showFlag = ref(false);

const title = computed(() => {
  return props.addFlag ? "添加角色" : "修改角色";
})

const handleClose = () => {
  model.value = {};
  showFlag.value = false;
}

const handleOpen = (row, parentId) => {
  // 解决修改表单但为提交数据，导致表格内容任然被修改，刷新后才能复原问题
  // model.value = cloneDeep(unref(row));
  model.value = {...unref(row)};
  if (parentId) {
    model.value.parentId = parentId
  }
  showFlag.value = true;
}

const onSubmit= () => {
  // todo 提交表单
  $emit('onSubmit', {...model.value})
  handleClose()
}

// 暴露打开弹窗操作
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
        label-position="right"
        label-width="100px"
        :model="model"
        :rules="roleRules"
        style="max-width: 460px">
      <el-form-item label="资源名称" prop="resourceName">
        <el-input v-model="model.resourceName"/>
      </el-form-item>
      <el-form-item label="资源路径" prop="path">
        <el-input v-model="model.path"/>
      </el-form-item>
      <el-form-item label="资源权限" prop="permission">
        <el-input v-model="model.permission"/>
      </el-form-item>
      <el-form-item label="菜单级别" prop="level">
        <el-input v-model="model.level"/>
      </el-form-item>
      <el-form-item label="资源类型" prop="resourceType">
        <el-select v-model="model.resourceType">
          <el-option :value="0" label="菜单" />
          <el-option :value="1" label="按钮" />
        </el-select>
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