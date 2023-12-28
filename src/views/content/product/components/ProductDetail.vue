<script setup>
import {ref, onMounted} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";
import {useVModel} from "@vueuse/core";
import {useRouter} from "vue-router";
import {getUploadFileUrlApi, uploadFileApi} from "@/api/system/oss";
import {ElMessage} from "element-plus";
import {getCategoryListApi} from "@/api/content/category";
import {getMaterialListApi} from "@/api/content/material";

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
const categorySelect = ref();
const materialCheckboxList = ref([])

// 加载初始值
onMounted(async () => {
  // modelObj.value = {
  //   categoryId: 0,
  //   name: '',
  //   description: '',
  //   publish: 0,
  //   stock: 0,
  //   price: 0,
  //   lowStock: 0,
  //   pic: '',
  //   materialIds: []
  // }
  const materialList = await getMaterialListApi({})
  materialCheckboxList.value = materialList.data

  const resp = await getCategoryListApi({type: 2})
  if (resp && resp.code === 200) {
    categorySelect.value = resp.data
  }
})

const handleSubmit = () => {
  emit('onSubmit')
}

const router = useRouter()
const handleCancel = () => {
  router.back()
}

const upload = async (options) => {
  const file = options.file
  const filename = file.name
  const scene = 'product'
  const ossResp = await getUploadFileUrlApi(filename, scene)

  const uploadUrl = ossResp.data.uploadUrl
  const uploadResp = await uploadFileApi(uploadUrl, file)

  if (uploadResp.status !== 200) {
    ElMessage.error("文件上传失败，请联系稍后再试或联系工作人员！")
    throw new Error("minio文件上传失败！")
  }

  modelObj.value.pic = ossResp.data.downloadUrl
}

</script>

<template>
  <div class="product-detail-page">
    <el-card shadow="never">

      <el-form label-width="120">
        <el-form-item label="商品分类">
          <el-select v-model="modelObj.categoryId"
                     placeholder="商品分类">
            <el-option :key="category.id"
                       :label="category.name"
                       :value="category.id"
                       v-for="category in categorySelect"/>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="modelObj.name"/>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item label="商品图片" prop="pic">

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
          <el-switch active-text="发布" inactive-text="取消" :active-value="1" :inactive-value="0" v-model="modelObj.publish"/>
        </el-form-item>

        <el-form-item label="库存量">
          <el-input-number v-model="modelObj.stock"/>
        </el-form-item>

        <el-form-item label="低库存报警">
          <el-input-number v-model="modelObj.lowStock"/>
        </el-form-item>

        <el-form-item label="商品售价">
          <el-input v-model="modelObj.price"/>
        </el-form-item>

        <el-form-item label="物料配置">
          <el-checkbox-group v-model="modelObj.materialIds">
            <el-checkbox
                :key="material.id"
                :label="material.id"
                v-for="material in materialCheckboxList">
              <template #default>
                <el-image style="width: 100px; height: 100px;" :src="material.pic"/>
              </template>
            </el-checkbox>
          </el-checkbox-group>
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

.el-checkbox-group {
  display: flex;

  .el-checkbox {
    display: block;
    position: relative;
    height: 100px;
    margin: 10px;

    &:deep(.el-checkbox__label) {
      padding: 0;
    }

    &:deep(.el-checkbox__input) {
      display: block;
      position: absolute;
      left: 5px;
      top: 5px;
    }
  }

  .is-checked {
    outline: 2px solid #337ecc;
  }
}
</style>