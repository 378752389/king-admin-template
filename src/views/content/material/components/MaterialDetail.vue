<script setup>
import {ref, computed, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import SvgIcon from "@/components/SvgIcon.vue";
import {getUploadFileUrlApi, uploadFileApi} from "@/api/system/oss";

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
  modelObj.price = row.price
  modelObj.pic = row.pic
  modelObj.description = row.description

  showFlag.value = true;
}

const upload = async (options) => {
  const file = options.file
  const filename = file.name
  const scene = 'material'
  const ossResp = await getUploadFileUrlApi(filename, scene)

  const uploadUrl = ossResp.data.uploadUrl
  const uploadResp = await uploadFileApi(uploadUrl, file)

  if (uploadResp.status !== 200) {
    ElMessage.error("文件上传失败，请联系稍后再试或联系工作人员！")
    throw new Error("minio文件上传失败！")
  }

  modelObj.pic = ossResp.data.downloadUrl
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


        <el-form-item label="价格" prop="price">
          <el-input v-model="modelObj.price"/>
        </el-form-item>

        <el-form-item label="物料介绍" prop="description">
          <el-input v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item label="图片" prop="pic">
          <el-upload
              :http-request="upload"
              list-type="picture-card"
              :show-file-list="false"
          >
            <el-image v-if="modelObj.pic" :src="modelObj.pic"/>
            <el-icon v-else class="avatar-uploader-icon">
              <SvgIcon :icon="'king-plus'"/>
            </el-icon>
          </el-upload>
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