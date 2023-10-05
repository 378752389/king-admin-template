<script setup>
import {ref, unref, computed, reactive} from "vue";

// const props = defineProps({
//   addFlag: {
//     type: Boolean,
//     required: true
//   }
// })


const addFlag = ref(true)

const initModel = {
  id: 4,
  username: '',
  password: '',
  avatar: '',
  email: '',
  gender: '',
  phone: '',
  qq: '',
  wechat: '',
  occupation: '',
  description: ''
}

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})

const roleModel = ref(initModel)

const showFlag = ref(true);

const title = computed(() => {
  return addFlag.value ? "添加角色" : "修改角色";
})

const handleClose = () => {
  roleModel.value = {};
  showFlag.value = false;
}

const handleOpen = (row) => {
  // 解决修改表单但为提交数据，导致表格内容任然被修改，刷新后才能复原问题
  // roleModel.value = cloneDeep(unref(row));
  roleModel.value = {...unref(row)};
  showFlag.value = true;
}

const onSubmit= () => {
  // todo 提交表单
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
        :model="roleModel"
        :rules="roleRules"
        style="max-width: 460px"
    >
      <el-form-item label="角色id" prop="id">
        <el-input :disabled="!addFlag" v-model="roleModel.id"/>
      </el-form-item>
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="roleModel.roleName"/>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input :disabled="!addFlag" v-model="roleModel.createTime"/>
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