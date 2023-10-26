<script setup>
import {ref, onMounted} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";
import TabSelect from "@/components/TabSelect.vue";
import {useVModel} from "@vueuse/core";

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

// 商品图片上传
const uploadPath = import.meta.env.VITE_FILE_UPLOAD_PATH;
const onUploadSuccess = (resp) => {
  resp.data && (modelObj.value.pic = Object.values(resp.data)[0])
}


// 加载初始值
onMounted(() => {
  modelObj.value = {
    categoryId: 1,
    name: '巨无霸',
    description: '',
    publish: 0,
    sort: 2,
    stock: 100,
    marketPrice: 30,
    price: 28,
    lowStock: 20,
    pic: '',
    materialIds: [1, 2, 3]
  }
})

const tabList = ref([
  {
    id: 1,
    name: '饮料',
    children: [
      {
        id: 1,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 2,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 3,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 4,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 5,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
    ]
  },
  {
    id: 2,
    name: '汉堡',
    children: [
      {
        id: 6,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 7,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      {
        id: 8,
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
    ]
  },
])

const handleSubmit = () => {

}

const handleCancel = () => {

}

</script>

<template>
  <div class="product-detail-page">
    <el-card shadow="never">

      <el-form label-width="120">
        <el-form-item label="商品分类">
          <el-select v-model="modelObj.categoryId">
            <el-option :label="'饮料'" :key="1" :value="1"/>
            <el-option :label="'炸鸡'" :key="2" :value="2"/>
            <el-option :label="'汉堡'" :key="3" :value="3"/>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="modelObj.name"/>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="modelObj.description"/>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">

          <el-upload
              name="files"
              :action="uploadPath + '?type=avatar'"
              :show-file-list="false"
              list-type="picture-card"
              :on-success="onUploadSuccess"
          >
            <el-image v-if="modelObj.pic" :src="modelObj.pic"/>
            <el-icon v-else>
              <SvgIcon icon="king-plus"/>
            </el-icon>
          </el-upload>

        </el-form-item>

        <el-form-item label="发布状态">
          <el-switch active-text="发布" inactive-text="取消" v-model="modelObj.publish"/>
        </el-form-item>

        <el-form-item label="库存量">
          <el-input-number v-model="modelObj.stock"/>
        </el-form-item>

        <el-form-item label="低库存报警">
          <el-input-number v-model="modelObj.lowStock"/>
        </el-form-item>

        <el-form-item label="市场价">
          <el-input v-model="modelObj.marketPrice"/>
        </el-form-item>

        <el-form-item label="商品售价">
          <el-input v-model="modelObj.price"/>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="modelObj.sort"/>
        </el-form-item>

        <!--      <el-form-item label="物料配置">-->
        <!--        <TabSelect :data="tabList" v-model="modelObj.materialIds">-->
        <!--          <template #default>-->
        <!--            <el-table-column label="id" prop="id"/>-->
        <!--          </template>-->
        <!--        </TabSelect>-->
        <!--      </el-form-item>-->

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