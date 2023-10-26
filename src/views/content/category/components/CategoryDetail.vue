<script setup>
import {ref, unref, computed, reactive} from "vue";

const props = defineProps({
  addFlag: {
    type: Boolean,
    required: true
  }
})

const initModel = {
  id: '',
  parentId: '',
  order: 1,
  categoryName: '',
  description: '',
  level: 1,
  count: '',
  enable: true,
  icon: '',
}

// 表单规则校验
const roleRules = reactive({
  id: [],
  roleName: [],
  createTime: []
})

const categoryModel = ref(initModel)

const showFlag = ref(false);

const title = computed(() => {
  return props.addFlag ? "添加角色" : "修改角色";
})

const handleClose = () => {
  categoryModel.value = {};
  showFlag.value = false;
}

const handleOpen = (row) => {
  // 解决修改表单但为提交数据，导致表格内容任然被修改，刷新后才能复原问题
  // categoryModel.value = cloneDeep(unref(row));
  categoryModel.value = {...unref(row)};
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
          :model="categoryModel"
          :rules="roleRules"
          style="max-width: 460px"
      >
        <el-form-item label="分类级别" prop="level">
          <el-input v-model="categoryModel.level"/>
        </el-form-item>
        <el-form-item label="父分类" prop="parentId">
          <el-input v-model="categoryModel.parentId"/>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="categoryModel.categoryName"/>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input v-model="categoryModel.description"/>
        </el-form-item>
        <el-form-item label="分类排序" prop="order">
          <el-input v-model="categoryModel.order"/>
        </el-form-item>
        <el-form-item label="分类图片" prop="icon">
          <el-input  v-model="categoryModel.icon"/>
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