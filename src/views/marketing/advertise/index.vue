<script setup>
import {getAdvertisePageApi, deleteAdvertiseApi} from "@/api/marketing/advertise";
import {ref, onMounted, reactive} from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router';

const router = useRouter();
const searchForm = ref({
  name: '',
  startTime: '',
  endTime: ''
});

const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100,
  pageSizeList: [10, 20, 50, 100]
})

const tableData = ref([])

/**
 * 页面挂载
 */
onMounted(async () => {
  await loadData()
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
    const resp = await getAdvertisePageApi({
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
    name: 'advertise-add'
  })
}


/**
 * 修改管理员
 */
const onEdit = (id) => {
  router.push({
    name: 'advertise-update',
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
    const res = await deleteAdvertiseApi(id)
    ElMessage.success(res.message)
    await loadData()
  } catch (e) {
    ElMessage.error(e)
  }
}
</script>

<template>
  <div class="advertise-page">
    <el-card class="search-card" shadow="never">
      <SectionTitle title="查询搜索"/>

      <!--      todo 查询表单数据-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item label="广告名" prop="name">
          <el-input
              v-model="searchForm.name"
              placeholder="输入广告名"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              placeholder="选择广告开始时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="searchForm.startTime"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
              placeholder="选择广告结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="searchForm.endTime"/>
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
      <el-table :data="tableData" v-loading="loadStatus" border header-cell-class-name="custom-header">
        <el-table-column type="index" width="120" label="序号"/>
        <el-table-column prop="name" label="广告名" show-overflow-tooltip/>
        <el-table-column prop="startTime" label="开始时间" width="180"/>
        <el-table-column prop="endTime" label="结束时间" width="180"/>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column label="发布状态">
          <template #default="scope">
            <el-switch style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                       :active-value="1"
                       :inactive-value="0"
                       v-model="scope.row.publish" />
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip/>
        <el-table-column label="管理" align="center" width="160">
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