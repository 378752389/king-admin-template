<script setup>
import {ref, computed, reactive, onMounted} from "vue";
import {getResourceTreeApi} from "@/api/system/resource";

const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  },
  roleModel: {
    type: Object,
    default: () => {
      return {
        id: '',
        roleName: '',
        createTime: '',
        resourceIds: []
      }
    }
  }
})

const model = ref(props.roleModel)

const $emit = defineEmits(['onSubmit'])

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
  model.value = {}
  showFlag.value = false;
}

const handleOpen = () => {
  // 解决修改表单但为提交数据，导致表格内容任然被修改，刷新后才能复原问题
  // roleModel.value = cloneDeep(unref(row));
  showFlag.value = true;
}

const onSubmit = () => {
  $emit('onSubmit', {...model.value})
  handleClose()
}

const handleCheck = (targetNode, checkedNode) => {
  model.value.resourceIds = checkedNode.checkedKeys
}

const resourceTree = ref([])

onMounted(async () => {
  // 加载资源树
  const resourceTreeRes = await getResourceTreeApi()
  resourceTree.value = resourceTreeRes.data
})

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
        style="max-width: 460px"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="model.roleName"/>
      </el-form-item>

      <el-form-item label="资源绑定" prop="resourceIds">
        <el-tree
            ref="treeRef"
            :data="resourceTree"
            show-checkbox
            node-key="id"
            @check="handleCheck"
            :default-checked-keys="model.resourceIds"
            highlight-current
            :props="{label: 'resourceName', children: 'children'}"/>

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