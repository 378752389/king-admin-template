<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router";
import {useUserInfoStore} from "@/stores/userInfo";
import {storeToRefs} from "pinia";

defineProps(['addFlag'])

const uploadPath = import.meta.env.VITE_FILE_UPLOAD_PATH + '?type=advertise';
const advertiseModel = ref({})
const router = useRouter()

const {uploadHeaders} = storeToRefs(useUserInfoStore())
const advertiseRules = ref([])
const previewDialog = ref(false)
const previewImageUrl = ref('')

onMounted(() => {
  advertiseModel.value = {
    name: '',
    startTime: '',
    endTime: '',
    publicStatus: 0,
    pics: [],
    sort: 0,
    href: '',
    description: ''
  }
})

const handleSubmit = () => {

}

const handleCancel = () => {
  router.back()
}

const onPreviewPic = (uploadedFile) => {
  previewImageUrl.value = uploadedFile.url
  previewDialog.value = true
}

const onRemovePic = () => {

}

</script>

<template>
  <div class="advertise-detail-page">
    <el-card shadow="never">
      <el-form
          label-position="right"
          label-width="100px"
          :model="advertiseModel"
          :rules="advertiseRules">

        <el-form-item label="广告名称" prop="name">
          <el-input v-model="advertiseModel.name"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              v-model="advertiseModel.startTime"
              type="datetime"
              placeholder="请选择开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
              v-model="advertiseModel.endTime"
              type="datetime"
              placeholder="请选择结束时间"
          />
        </el-form-item>
        <el-form-item label="发布状态" prop="publicStatus">
          <el-switch
              active-text="发布"
              inactive-text="取消"
              v-model="advertiseModel.publicStatus"
          />
        </el-form-item>
        <el-form-item label="图片" prop="pic">
          <!--        <el-input v-model="advertiseModel.pic"/>-->
          <el-upload
              v-model:file-list="advertiseModel.pics"
              :action="uploadPath"
              :headers="uploadHeaders"
              :on-preview="onPreviewPic"
              :on-remove="onRemovePic"
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
          <el-input-number v-model="advertiseModel.sort"/>
        </el-form-item>
        <el-form-item label="广告类型" prop="type">
          <el-select
              v-model="advertiseModel.type">
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" prop="href">
          <el-input v-model="advertiseModel.href"/>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input type="textarea" rows="3" v-model="advertiseModel.description"/>
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