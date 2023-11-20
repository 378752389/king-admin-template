<script setup>
import {getPackagePageApi, deletePackageApi, switchPackagePublishStatusApi} from "@/api/content/package";
import {ref, onMounted, reactive} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from 'vue-router';
import {getCategoryListApi} from "@/api/content/category";

const router = useRouter();
const searchForm = ref({
  name: '',
  categoryId: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = ref([])
const categorySelect = ref([])
const loadCategorySelect = async () => {
  const resp = await getCategoryListApi({type: 1})
  categorySelect.value = resp.data
}
/**
 * 页面挂载
 */
onMounted(async () => {
  await loadData()

  await loadCategorySelect()
})


const pageNumChange = (pageNum) => {
  loadData({pageNum, pageSize: pageData.pageSize, ...searchForm.value})
}
const pageSizeChange = (pageSize) => {
  loadData({pageSize, pageNum: pageData.pageNum, ...searchForm.value})
}

const loadStatus = ref(false)
const loadData = async () => {
  loadStatus.value = true
  try {
    const resp = await getPackagePageApi({
      pageNum: pageData.pageNum,
      pageSize: pageData.pageSize,
      ...searchForm.value
    })

    if (resp && resp.data) {
      // todo
      tableData.value = resp.data.dataList;
      pageData.pageNum = resp.data.pageNum;
      pageData.pageSize = resp.data.pageSize;
      pageData.total = resp.data.total;
    }
  } catch (e) {
    ElMessage.error(e.messages)
  } finally {
    loadStatus.value = false
  }


}

/**
 * 表单搜索
 */
const onSearch = () => {
  loadData()
}

const searchFormRef = ref(null)
/**
 * 重制搜索表单
 */
const onReset = () => {
  searchFormRef.value.resetFields()
  loadData()
}

/**
 * 添加管理员
 */
const onAdd = () => {
  router.push({
    name: 'package-add'
  })
}


/**
 * 修改管理员
 */
const onEdit = (id) => {
  router.push({
    name: 'package-update',
    query: {
      id
    }
  })
}

/**
 * 删除管理员
 * @param row
 */
const onDelete = async (row) => {
  const id = row.id;

  try {
    const res = await deletePackageApi(id)
    ElMessage.success(res.message)
    await loadData()
  } catch (e) {
    ElMessage.error(e)
  }
}

/**
 * 页面初始化由于 switch 绑定的 actvie-value 和 inactvie-value 与表单中的值不一致，
 * 导致会触发 会修改 v-model 绑定的表单的值，导致触发了一次 change时间，before-change
 * 可以阻止初次调用时 触发 change 事件
 * @type {Ref<UnwrapRef<boolean>>}
 */
const switchEnable = ref(false)
const publishBeforeChange = () => {
  switchEnable.value = true;
  return switchEnable.value;
}
const onPublishInput = (row) => {
  if (!switchEnable.value) {
    return
  }
  ElMessageBox.confirm(
      '请确定是否修改发布状态？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    row.switchLoading = true;
    return new Promise((resolve) => {
      // todo
      // 当前状态
      const currentStatus = row.publish
      // 修改后的状态
      const newStatus = (currentStatus === 1 ? 0 : 1)
      switchPackagePublishStatusApi(newStatus).then(res => {
        // 正常处理
        ElMessage.success(res.message);
        row.publish = newStatus
        resolve(true);
      }).catch(e => {
        // 错误异常处理， 异常进行打印，不进行抛出
        ElMessage.error(e.message)
      }).finally(() => {
        row.switchLoading = false;
      })
    })

  }).catch(() => {
    ElMessage.info("取消操作")
  })
}

</script>

<template>
  <div class="package-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="套餐名称" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="套餐名称"/>
        </el-form-item>
        <el-form-item label="套餐分类" prop="categoryId">
          <el-select
              v-model="searchForm.categoryId"
              placeholder="套餐分类">
            <el-option :key="category.id"
                       :label="category.name"
                       :value="category.id"
                       v-for="category in categorySelect"/>
          </el-select>
        </el-form-item>
        <el-form-item style="">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-card" shadow="never">
      <SectionTitle title="数据列表">
        <el-button type="success" @click="onAdd">创建</el-button>
      </SectionTitle>

      <!--     todo 表格数据-->
      <!--      table-layout: 固定表格宽度，让表格撑满整个父元素-->
      <el-table :data="tableData" v-loading="loadStatus" border>
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="name" label="套餐名" show-overflow-tooltip/>
        <el-table-column prop="categoryName" label="所属分类"/>
        <el-table-column prop="promotionPrice" label="售价"/>
        <el-table-column prop="totalPrice" label="套餐总价"/>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column prop="description" label="套餐介绍" show-overflow-tooltip/>
        <el-table-column label="发布状态">
          <template #default="scope">
            <el-switch style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                       :active-value="1"
                       :inactive-value="0"
                       :before-change="publishBeforeChange"
                       @input="onPublishInput(scope.row)"
                       :loading="!!scope.row.switchLoading"
                       :model-value="scope.row.publish"/>
          </template>
        </el-table-column>
        <el-table-column label="管理" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" @click="onEdit(scope.row.id)">编辑</el-button>

            <el-popconfirm
                width="220"
                @confirm="onDelete(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="king-question-filled"
                icon-color="#626AEF"
                title="请确认是否删除？">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <!--      分页-->
      <el-pagination background layout="prev, pager, jumper, next, total, sizes"
                     v-model:current-page="pageData.pageNum"
                     v-model:page-size="pageData.pageSize"
                     :page-sizes="pageData.pageSizeList"
                     :total="pageData.total"
                     @current-change="pageNumChange"
                     @size-change="pageSizeChange"/>
    </el-card>

  </div>

</template>

<style lang="less" scoped>
</style>