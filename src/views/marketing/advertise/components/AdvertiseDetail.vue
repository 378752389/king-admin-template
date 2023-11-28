<script setup>
import {ref, computed} from 'vue';
import {useRouter} from "vue-router";
import {useUserInfoStore} from "@/stores/userInfo";
import {storeToRefs} from "pinia";
import {useVModel} from "@vueuse/core";

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


const picList = computed(() => {
  return modelObj.value.pics.split(",")
})

const uploadPath = import.meta.env.VITE_FILE_UPLOAD_PATH + '?type=advertise';
const router = useRouter()

const {uploadHeaders} = storeToRefs(useUserInfoStore())
const advertiseRules = ref([])
const previewDialog = ref(false)
const previewImageUrl = ref('')

const handleSubmit = () => {
  emit('onSubmit')
}

const handleCancel = () => {
  router.back()
}

const onPreviewPic = (uploadedFile) => {
  previewImageUrl.value = uploadedFile.url
  previewDialog.value = true
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
              :action="uploadPath"
              :headers="uploadHeaders"
              :on-preview="onPreviewPic"
              name="files"
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
          <el-input-number v-model="modelObj.sort"/>
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

    <el-dialog v-model="previewDialog">
      <img :src="previewImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>