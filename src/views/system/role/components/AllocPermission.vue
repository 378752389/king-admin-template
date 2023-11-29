<script setup>

import {ref, onMounted, computed} from "vue";
import {getResourceTreeApi} from "@/api/system/resource";
import SectionTitle from "@/components/SectionTitle.vue";
import {updateRoleApi} from "@/api/system/role";
import {useRoute, useRouter} from "vue-router";
import {ElLoading, ElMessage} from "element-plus";
import {Waterfall} from "vue-waterfall-plugin-next";
import 'vue-waterfall-plugin-next/dist/style.css'

// ============================== 属性 =======================================

const resourceTreeData = ref([])
const route = useRoute()
const router = useRouter()

// 一级菜单勾选项
const rootCheckedList = computed(() => {
  const res = []
  const tree = resourceTreeData.value

  tree.forEach(x => {
    if (x.checked.length > 0) {
      // 添加
      res.push(x.id)
    } else {
      // 删除
      res.filter(item => item !== x.id)
    }
  })

  return res
})

const loadData = async () => {
  const id = route.query.id
  const res = await getResourceTreeApi(id)
  if (res && res.code === 200) {
    resourceTreeData.value = res.data
  }
}

onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    await loadData()
  } finally {
    loading.close()
  }
})

// ============================== 普通函数 =======================================
const findItem = (id) => {
  const tree = resourceTreeData.value
  for (let i = 0; i < tree.length; i++) {
    let tgt = recursion(id, tree[i])
    if (tgt) return tgt
  }

  function recursion(id, node) {
    if (id === node.id) {
      return node
    }
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        let tgt = recursion(id, node.children[i])
        if (tgt) {
          return tgt;
        }
      }
    }
  }
}

const isIndeterminate = (nodeData) => {
  // debugger
  const checkedNode = nodeData.checked
  return checkedNode.length > 0 && checkedNode.length < nodeData.children.length
}


// ============================== 事件 =======================================
const onGroupChange = (e, resourceList) => {
  resourceList.checked = e ? resourceList.children.map(x => x.id) : []
}
const onItemChange = (nodeData) => {
  if (nodeData.checked.length === nodeData.children.length) {
    const pid = nodeData.parentId
    const parentNodeData = findItem(pid)

    parentNodeData.checked.push(nodeData.id)
  }
}

const onCancel = () => {
  router.back()
}

const onSubmit = async () => {
  const res = []

  function recursion(tree) {
    // 初始化操作
    res.push(...tree.checked)

    if (tree.children && tree.children.length > 0) {
      for (let i = 0; i < tree.children.length; i++) {
        recursion(tree.children[i])
      }
    }
  }

  // 收集所有子节点 checked 数据
  const tree = resourceTreeData.value
  for (let i = 0; i < tree.length; i++) {
    recursion(tree[i])
  }

  // 收集所有根节点checked数据
  res.push(...rootCheckedList.value)

  const resp = await updateRoleApi({
    id: route.query.id,
    resourceIds: res
  })

  if (resp && resp.code === 200) {
    ElMessage.success(resp.message)
    await router.back()
  }

}

</script>

<template>
  <div class="alloc-permission-page">

    <Waterfall :list="resourceTreeData" :width="830">
      <template #item="{ item }">
        <el-card class="card" shadow="never" :key="item.id">
          <SectionTitle :title="item.resourceName"/>

          <el-checkbox-group v-model="item.checked">

            <el-descriptions direction="vertical"
                             size="large"
                             :key="resourceList.id"
                             v-for="resourceList in item.children"
                             :column="1" border>


              <el-descriptions-item
                  label-align="left"
                  align="left">

                <template #label>
                  <el-checkbox
                      @change="onGroupChange($event, resourceList)"
                      :indeterminate="isIndeterminate(resourceList)"
                      :label="resourceList.id">
                    {{ resourceList.resourceName }} （菜单）
                  </el-checkbox>
                </template>

                <el-checkbox-group
                    v-model="resourceList.checked">
                  <el-checkbox :key="resource.id" :label="resource.id"
                               @change="onItemChange(resourceList)"
                               v-for="resource in resourceList.children">
                    {{ resource.resourceName }} （接口）
                  </el-checkbox>
                </el-checkbox-group>
              </el-descriptions-item>
            </el-descriptions>
          </el-checkbox-group>
        </el-card>
      </template>
    </Waterfall>

    <div style="display: flex;">
      <div style="margin: auto">
        <el-button size="large" @click="onCancel">取消</el-button>
        <el-button size="large" type="primary" @click="onSubmit">提交</el-button>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>

.alloc-permission-page {

  .el-descriptions {
    &:deep(.el-descriptions__cell) {
      padding: 20px;
    }
  }
}
</style>