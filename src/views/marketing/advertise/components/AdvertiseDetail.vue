<script setup>
import {ref, onMounted, watch} from 'vue';
import {useRouter} from "vue-router";
import {useVModel} from "@vueuse/core";
import {getUploadFileUrlApi, uploadFileApi} from "@/api/system/oss";
import {ElMessage} from "element-plus";

const props = defineProps({
  addFlag: {
    type: Boolean
  },
  modelValue: {
    type: Object,
    default: function () {
      return {
        id: 0,
        name: '',
        startTime: '',
        endTime: '',
        publish: 0,
        pics: '',
        sort: 0,
        href: '',
        description: ''
      }
    }
  }
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])
const modelObj = useVModel(props, 'modelValue', emit)

const router = useRouter()
const picList = ref([])
const advertiseRules = ref([])
const handleSubmit = () => {
  emit('onSubmit')
}

const handleCancel = () => {
  router.back()
}

watch(() => props.modelValue.pics, () => {
  if (!modelObj.value.pics) {
    console.log("asd", modelObj.value.pics)
    return
  }

  picList.value = modelObj.value.pics.split(',').filter(x => x.trim() !== '').map(url => {
    return {
      url,
      name: url.substring(url.lastIndexOf('/') + 1)
    }
  })
})

const upload = async (options) => {
  const file = options.file
  const filename = file.name
  const scene = 'advertise'
  const ossResp = await getUploadFileUrlApi(filename, scene)

  const uploadUrl = ossResp.data.uploadUrl
  const uploadResp = await uploadFileApi(uploadUrl, file)

  if (uploadResp.status !== 200) {
    ElMessage.error("文件上传失败，请联系稍后再试或联系工作人员！")
    throw new Error("minio文件上传失败！")
  }

  if (modelObj.value.pics.trim() === '') {
    modelObj.value.pics = ossResp.data.downloadUrl
  } else {
    modelObj.value.pics = modelObj.value.pics + ',' + ossResp.data.downloadUrl
  }
}

const onUploadRemove = (removeFile, files) => {
  modelObj.value.pics = files.map(x => x.url).join(',')
  // console.log(removeFile, files)
}
</script>

<template>
  <div class="advertise-detail-page">
    <el-card class="form-card" shadow="never">
      <el-form
          label-position="right"
          label-width="100px"
          :model="modelObj"
          :rules="advertiseRules">

        <el-form-item label="广告名称" prop="name">
          <el-input v-model="modelObj.name"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              v-model="modelObj.startTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
              v-model="modelObj.endTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择结束时间"
          />
        </el-form-item>
        <el-form-item label="发布状态" prop="publish">
          <el-switch
              active-text="发布"
              inactive-text="取消"
              :active-value="1"
              :inactive-value="0"
              v-model="modelObj.publish"
          />
        </el-form-item>
        <el-form-item label="图片" prop="pic">
          <!--        <el-input v-model="modelObj.pic"/>-->
          <el-upload
              multiple
              :http-request="upload"
              :on-remove="onUploadRemove"
              v-model:file-list="picList"
              list-type="picture">
            <el-button type="primary">上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                只允许上传 jpg/png 图片，并且图片大小不能超过 5MB
              </div>
            </template>
          </el-upload>

        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number  v-model="modelObj.sort"/>
        </el-form-item>

        <el-form-item label="广告类型" prop="type">
          <el-select
              v-model="modelObj.type">
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" prop="href">
          <el-input v-model="modelObj.href"/>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input type="textarea" rows="3" v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item>
          <el-button type="default" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<style scoped>

</style>