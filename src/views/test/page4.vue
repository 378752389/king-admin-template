<script setup>
import {ref, onMounted, reactive} from 'vue';
import {getRoleDetailApi} from "@/api/system/role";
import {getResourceTreeApi} from "@/api/system/resource";

const modelObj = reactive({
  id: '',
  roleName: '',
  resourceIds: []
})
const resourceTreeData = ref([])
const loadDetail = async () => {
  const resp = await getRoleDetailApi(9)
  console.log(resp.data)
  modelObj.id = resp.data.id
  modelObj.roleName = resp.data.roleName
  modelObj.resourceIds = resp.data.resourceIds

  console.log("modelObj", modelObj)
}

onMounted(async () => {
  await loadDetail()

  const resourceTreeRes = await getResourceTreeApi()
  resourceTreeData.value = resourceTreeRes.data
  console.log(resourceTreeRes.data)
})

const checkList = ref([1, 2, 3, 4, 5])
const labelList = ref([
  {
    id: 1,
    name: '语文',
  },
  {
    id: 2,
    name: '数学',
  },
  {
    id: 3,
    name: '英语',
  },
  {
    id: 4,
    name: '体育',
  },
  {
    id: 5,
    name: '科学',
  },
])

/**
 * node: nextSibling、previousSibling、parent、children
 * @param node： element-plus 对节点数据进行的封装， 通过 node.data 可以获取节点数据
 * @param data： 节点数据
 */
const remove = (node, data) => {
  console.log("node", node)
  console.log("data", data)
}
</script>

<template>

  <div class="page4">

    <el-tree
        :data="resourceTreeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">

      <template #default="{ data }">
        <!--        菜单按钮-->
        <a  v-if="data.resourceType === 0" style="margin-left: 8px"> {{ data.resourceName }} </a>

        <!--        <a v-if="data.resourceType === 2" style="margin-left: 8px" @click="remove(node, data)"> {{ data.resourceName }} </a>-->
      </template>

    </el-tree>

  </div>
</template>

<style lang="less" scoped>

</style>