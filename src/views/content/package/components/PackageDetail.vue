<script setup>
import {ref, onMounted} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";
import TabSelect from "@/components/TabSelect.vue";
import {useVModel} from "@vueuse/core";
import {useRouter} from "vue-router";
import {getCategoryListApi, getCategoryProductApi} from "@/api/content/category";
import {getUploadFileUrlApi, uploadFileApi} from "@/api/system/oss";
import {ElMessage} from "element-plus";

// 模型数据双向绑定
const props = defineProps({
  addFlag: {
    type: Boolean
  },
  modelValue: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue', 'onSubmit'])
const modelObj = useVModel(props, 'modelValue', emit)
const categorySelect = ref([])

const router = useRouter()
const tabList = ref([])
const packageTypeEnum = ref([
  {label: '单品套餐', value: 1, type: ''},
  {label: '组合套餐', value: 2, type: 'success'},
])

const upload = async (options) => {
  const file = options.file
  const filename = file.name
  const scene = 'package'
  const ossResp = await getUploadFileUrlApi(filename, scene)

  const uploadUrl = ossResp.data.uploadUrl
  const uploadResp = await uploadFileApi(uploadUrl, file)

  if (uploadResp.status !== 200) {
    ElMessage.error("文件上传失败，请联系稍后再试或联系工作人员！")
    throw new Error("minio文件上传失败！")
  }

  modelObj.value.pic = ossResp.data.downloadUrl
}

// 加载初始值
onMounted(async () => {
  const tabListResp = await getCategoryProductApi()
  if (tabListResp.data) {
    tabList.value = tabListResp.data
  }

  const categoryResp = await getCategoryListApi({type: 1})
  if (categoryResp.data) {
    categorySelect.value = categoryResp.data
  }
})

const handleSubmit = () => {
  emit('onSubmit')
}

const handleCancel = () => {
  router.back()
}

</script>

<template>
  <div class="package-detail-page">
    <el-card shadow="never">

      <el-form label-width="120">
        <el-form-item label="套餐分类">
          <el-select v-model="modelObj.categoryId" placeholder="请选择套餐分类">
            <el-option :label="item.name" :key="item.id" :value="item.id" v-for="item in categorySelect"/>
          </el-select>
        </el-form-item>

        <el-form-item label="套餐类型">
          <el-select v-model="modelObj.type" placeholder="请选择套餐类型" :disabled="!addFlag">
            <el-option :label="typeEnum.label" :key="typeEnum.value" :value="typeEnum.value" v-for="typeEnum in packageTypeEnum"/>
          </el-select>
        </el-form-item>

        <el-form-item label="套餐名称">
          <el-input v-model="modelObj.name"/>
        </el-form-item>

        <el-form-item label="套餐介绍">
          <el-input type="textarea" v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item label="套餐图片" prop="avatar">

          <el-upload
              :show-file-list="false"
              :http-request="upload"
              list-type="picture-card"
          >

            <el-image v-if="modelObj.pic" :src="modelObj.pic"/>
            <el-icon v-else>
              <SvgIcon icon="king-plus"/>
            </el-icon>
          </el-upload>

        </el-form-item>

        <el-form-item label="发布状态">
          <el-switch active-text="发布"
                     inactive-text="取消"
                     :active-value="1"
                     :inactive-value="0"
                     v-model="modelObj.publish"/>
        </el-form-item>

        <el-form-item label="套餐售价" style="width: 500px">
          <el-input type="number" v-model="modelObj.promotionPrice"/>
        </el-form-item>

        <el-form-item label="低库存警告">
          <el-input-number v-model="modelObj.lowStock"/>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="modelObj.sort"/>
        </el-form-item>

        <el-form-item label="商品选择">
          <TabSelect :data="tabList" v-model="modelObj.productIds">
            <template #default>
              <el-table-column label="id" prop="id"/>
              <el-table-column label="商品名称" prop="name"/>
              <el-table-column label="单价" prop="price"/>
              <el-table-column label="描述" prop="description" show-overflow-tooltip/>
            </template>
          </TabSelect>
        </el-form-item>

        <el-form-item>
          <el-button type="default" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<style lang="less" scoped>
.el-form {
  margin: 30px auto 0;
  width: 80%;
}
</style>