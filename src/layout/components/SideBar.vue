<script setup>
import {watch, ref, onMounted} from 'vue'
import SvgIcon from "@/components/SvgIcon.vue";
import {routes} from "@/router";
import {useRoute} from "vue-router";
import {useAppStore} from "@/stores/app";
import {useUserInfoStore} from "@/stores/userInfo";
import {storeToRefs} from "pinia";

const {sidebarCollapse} = storeToRefs(useAppStore());
const {permissionList} = storeToRefs(useUserInfoStore());

const props = defineProps({
  authedRoute: {
    type: Array,
    default: () => []
  }
})

const currentRoute = useRoute();

// 监听侧边栏宽度变化
const sidebarWidth = ref('0');

watch(sidebarCollapse, (n) => {
  sidebarWidth.value = n ? '0' : '230px';
}, {immediate: true})

const processRoutes = (routeList) => {
  // 1. 依据权限来筛选子菜单
  // 2. 筛选所有隐藏菜单
  const permittedRoutes = [];
  const permissionList = props.authedRoute.map(x => x.permission);
  for (let i = 0; i < routeList.length; i++) {
    const routeItem = routeList[i];
    if (routeItem.meta
        && routeItem.meta.permission
        && routeItem.meta.permission.length > 0) {


      // 路由项有配置permission，需要有对应的权限才能访问
      if (permissionList.indexOf(routeItem.meta.permission) !== -1) {
        // 有对应的权限，进行渲染
        permittedRoutes.push(routeItem);
        if (routeItem.children && routeItem.children.length > 0) {
          routeItem.children = processRoutes(routeItem.children);
        }
      }
    } else {
      // 路由项没有配置 permission，默认都可以访问
      permittedRoutes.push(routeItem);
    }
  }
  console.log("permissionList", permissionList)
  console.log("permittedRoutes", permittedRoutes)
  return permittedRoutes.sort((a, b) => {
    let before = a.order === undefined ? 999 : a.order
    let after = b.order === undefined ? 999 : b.order
    return before - after
  });
}

onMounted(() => {
  console.log(routes)
  console.log(permissionList.value)
})
</script>

<template>

  <div class="side-bar-area">
    <el-scrollbar height="100%">
      <el-menu
          active-text-color="#409eff"
          background-color="#304156"
          text-color="#bfcbd9"
          class="side-bar"
          :default-active="currentRoute.path"
          :collapse="sidebarCollapse"
          router>
        <template v-for="routeItem in routes">
          <!--          ( permissionList.indexOf(routeItem.meta.permission) !== -1)-->
          <template
              v-if="!routeItem.meta.hidden && (routeItem.meta.permission === '' || permissionList.indexOf(routeItem.meta.permission) !== -1)">
            <!--        菜单项包含子菜单-->
            <el-sub-menu
                v-if="routeItem.children && routeItem.children.length > 0"
                :key="routeItem.name"
                :index="routeItem.path">
              <template #title>

                <SvgIcon :icon="routeItem.meta.icon || 'king-menu'"/>
                <span>{{ routeItem.meta.title }}</span>
              </template>

              <template :key="childItem.name" v-for="childItem in routeItem.children">
                <!--              添加选择 hidden 不为 true 的菜单项-->
                <template v-if="!childItem.meta.hidden && (childItem.meta.permission === '' || permissionList.indexOf(childItem.meta.permission) !== -1)">
                  <el-menu-item
                      :index="routeItem.path + '/' + childItem.path">
                    <SvgIcon :icon="childItem.meta.icon || 'king-location'"/>
                    <template #title>{{ childItem.meta.title }}</template>
                  </el-menu-item>
                </template>
              </template>


            </el-sub-menu>
            <!--        菜单项不包含子菜单-->
            <el-menu-item v-else
                          :key="routeItem.name"
                          :index="routeItem.path">
              <SvgIcon :icon="routeItem.meta.icon || 'king-menu'"/>
              <template #title>{{ routeItem.meta.title }}</template>
            </el-menu-item>
          </template>

        </template>
      </el-menu>
    </el-scrollbar>
  </div>


</template>

<style lang="less" scoped>

.side-bar-area {
  height: 100%;

  &:deep(.side-bar) {
    // 设置侧边栏的最小宽度，不然内容会被侧边栏 menu-item撑开
    .el-sub-menu, .el-menu-item {
      min-width: v-bind(sidebarWidth);
    }

    .el-sub-menu__title:hover {
      background-color: #385269 !important;
    }

    .el-menu-item:hover {
      background-color: #001528 !important;
      color: white;
    }

    .el-menu-item {
      background-color: #1b2c3d;
    }


  }
}
</style>