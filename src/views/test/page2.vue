<script setup>
import {onMounted, ref} from "vue";
import {getUploadFileUrlApi, uploadFileApi} from "@/api/system/oss";
import request from "@/utils/request";
import {ElMessage} from "element-plus";

const fileList = ref([])
onMounted(async () => {

})

const onPreview = (uploadFiles) => {
  console.log("触发 onPreview", uploadFiles)
}
/**
 *
 * @param file          点击删除的文件
 * @param uploadFiles   剩余待上传的文件列表
 */
const onRemove = (file, uploadFiles) => {
  console.log("触发 onRemove", file, uploadFiles)
}

const onChange = () => {
  console.log("change", fileList.value)
}

const onSuccess = (resp, file, fileList) => {
  console.log("onSuccess", resp, file, fileList)
}

const upload = async (options) => {

  const file = options.file
  const filename = file.name
  const ossResp = await getUploadFileUrlApi(filename, "product", false)
  const resp = await uploadFileApi(ossResp.data.uploadUrl, file)
  if (resp.status !== 200) {
    ElMessage.error("文件上传失败，请联系稍后再试或联系工作人员！")
    throw new Error("minio文件上传失败！")
  }

}

const onError = () => {
}
const onProgress = () => {
}


</script>

<template>
  <div class="page2">
    <el-upload
        v-model:file-list="fileList"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-change="onChange"
        :on-success="onSuccess"
        :http-request="upload"
        list-type="picture-card"
        multiple
    >

      <el-link>上传文件</el-link>

      <template #tip>
        文件大小不能超过50kb
      </template>
    </el-upload>
  </div>
</template>

<style scoped>


</style>