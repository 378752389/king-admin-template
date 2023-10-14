<script setup>
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import {ElMessageBox, ElMessage} from 'element-plus';
import {getRoleListApi} from "@/api/system/role";
import {useRoute} from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import {getAdmin} from "@/api/system/admin";

const uploadPath = import.meta.env.VITE_FILE_UPLOAD_PATH;
const props = defineProps(['addFlag']);
const route = useRoute();
const userModel = ref({});
const uploadProgress = ref({
  showStatus: false,
  percent: 0
});

const roleSelectList = ref([]);
const genderSelectList = ref([
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 0
  }
]);

// 表单规则校验
const userRules = reactive({});

onMounted(async () => {
  // 页面初始化公共操作
  const res = await getRoleListApi({})
  if (res && res.data) {
    roleSelectList.value = res.data
  }

  if (!props.addFlag) {
    // 修改页面初始化操作， 加载表单数据
    const id = route.query.id;
    const adminRes = await getAdmin(id);
    if (adminRes && adminRes.data) {
      userModel.value = {...adminRes.data, roleIds: adminRes.data.roleList.map(x => x.id)}
    }
  } else {
    // 添加页面初始化操作
    userModel.value = {};
  }

})

const $emit = defineEmits(["onSubmit"]);
const handleSubmit = () => {
  ElMessageBox.confirm(
      '请确认是否提交？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    $emit('onSubmit', {...userModel.value})
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消提交',
    })
  })

}

const onUploadSuccess = (resp) => {
  resp.data && (userModel.value.avatar = Object.values(resp.data)[0])
}

const onBeforeUpload = (rawFile) => {
  if (['image/jpeg', 'image/png'].indexOf(rawFile.type) === -1) {
    ElMessage.error('头像文件必须为 jpg 或 png!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}
const onUploadProgress = (e) => {
  let p = Math.floor(e.percent * 10) / 10;
  if (p === 100) {
    uploadProgress.value.showStatus = false;
  } else {
    uploadProgress.value.showStatus = true;
    uploadProgress.value.percent = p;
  }
}

const handleCancel = () => {
  userModel.value = {};
  router.back();
}
</script>

<template>
  <el-card>
    <el-form
        label-position="right"
        label-width="100px"
        :model="userModel"
        :rules="userRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userModel.username" :disabled="!addFlag"/>
      </el-form-item>

      <el-form-item label="密码" prop="password" v-if="addFlag">
        <el-input type="password" v-model="userModel.password"/>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">

        <el-upload
            name="files"
            :action="uploadPath + '?type=avatar'"
            :show-file-list="false"
            list-type="picture-card"
            :on-success="onUploadSuccess"
            :before-upload="onBeforeUpload"
            :on-progress="onUploadProgress"
        >
          <el-image v-if="!uploadProgress.showStatus && userModel.avatar" :src="userModel.avatar"/>
          <el-icon v-else>
            <el-progress v-if="uploadProgress.showStatus" :percentage="uploadProgress.percent"/>
            <SvgIcon v-else icon="king-plus"/>
          </el-icon>
        </el-upload>

      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userModel.email"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select
            v-model="userModel.gender"
            placeholder="选择性别">
          <el-option
              v-for="gender in genderSelectList"
              :key="gender.value"
              :label="gender.label"
              :value="gender.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userModel.phone"/>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="userModel.qq"/>
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="userModel.wechat"/>
      </el-form-item>
      <el-form-item label="职业" prop="occupation">
        <el-input v-model="userModel.occupation"/>
      </el-form-item>
      <el-form-item label="详情" prop="description">
        <el-input type="textarea" rows="3" v-model="userModel.description"/>
      </el-form-item>

      <el-form-item label="绑定角色" prop="roleIds">
        <el-select
            v-model="userModel.roleIds"
            multiple
            placeholder="选择角色"
            style="width: 40%; min-width: 200px">
          <el-option
              v-for="role in roleSelectList"
              :key="role.id"
              :label="role.roleName"
              :value="role.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
</style>