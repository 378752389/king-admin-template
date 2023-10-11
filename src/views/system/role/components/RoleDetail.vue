<script setup>
import {ref, computed, reactive, onMounted} from "vue";
import {getResourceTreeApi} from "@/api/system/resource";

const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  }
})

const $emit = defineEmits(['onSubmit'])
// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})
const model = ref({})
const showFlag = ref(false);
const treeRef = ref(null);
const title = computed(() => {
  return props.addFlag ? "添加角色" : "修改角色";
})

const handleClose = () => {
  model.value = {}
  showFlag.value = false;
}

const handleOpen = (row) => {
  model.value = {...row}
  showFlag.value = true;
}

const onSubmit = () => {
  const pushData = {...model.value};
  $emit('onSubmit', pushData)
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

const onOpen = () => {
  // el-dialog是懒加载的，如果不添加监听事件，在 handleOpen 拿不到 treeRef
  treeRef.value.setCheckedKeys(model.value.resourceIds)
}

const onClose = () => {
  // el-dialog是懒加载的，如果不添加监听事件，在 handleOpen 拿不到 treeRef
  treeRef.value.setCheckedKeys([])
}

defineExpose({
  handleOpen
})

</script>

<template>
  <el-dialog
      v-model="showFlag"
      :title="title"
      @open="onOpen"
      @close="onClose"
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
            :check-strictly="true"
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