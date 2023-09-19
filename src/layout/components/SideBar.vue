<script setup>
import {reactive} from 'vue'
import SvgIcon from "@/components/SvgIcon.vue";
import {routes} from "@/router";
import {useRoute} from "vue-router";
import {useAppStore} from "@/stores/app";
import {storeToRefs} from "pinia";

const {sidebarCollapse} = storeToRefs(useAppStore());

const props = defineProps({
  authedRoute: {
    type: Array,
    default: () => []
  }
})

const settings = reactive({
  projectName: 'king-admin-template'
})

const currentRoute = useRoute();
const processRoutes = (routeList) => {
  // 1. 依据权限来筛选子菜单
  // 2. 筛选所有隐藏菜单
  const permittedRoutes = [];
  for (let i = 0; i < routeList.length; i++) {
    const routeItem = routeList[i];
    if (routeItem.meta
        && routeItem.meta.permission
        && routeItem.meta.permission.length > 0) {

      // 路由项有配置permission，需要有对应的权限才能访问
      if (props.authedRoute.indexOf(routeItem.meta.permission) !== -1) {
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
  return permittedRoutes;
}
</script>

<template>

  <div class="side-bar-area">
<!--    <div class="project-title">-->
<!--      <SvgIcon icon="king-home-filled"/>-->
<!--      <span v-if="!sidebarCollapse">{{ settings.projectName }}</span>-->
<!--    </div>-->
    <el-menu
        active-text-color="#409eff"
        background-color="#304156"
        text-color="#bfcbd9"
        class="side-bar"
        :default-active="currentRoute.path"
        :collapse="sidebarCollapse"
        router>
      <template v-for="routeItem in processRoutes(routes)">
        <template v-if="routeItem.meta.hidden !== true">
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
              <template v-if="childItem.meta.hidden !== true">
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

    <!--    <el-button-->
    <!--        class="collapse-btn"-->
    <!--        @click="isCollapse = !isCollapse"-->
    <!--        text>-->
    <!--      <SvgIcon v-if="isCollapse" icon="king-expand"/>-->
    <!--      <SvgIcon v-else icon="king-fold"/>-->
    <!--    </el-button>-->
  </div>


</template>

<style scoped>

.side-bar-area {
  display: flex;
  flex-direction: column;
  height: 100%;
//background-color: #304156;
}

.project-title {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #304156;
  margin-right: 1px;
  color: #bfcbd9;
}

:deep(.side-bar) {
  flex-grow: 1;
}

:deep(li.el-sub-menu.is-opened .el-menu-item) {
  background-color: #1b2c3d;
}

.collapse-btn {
  text-align: right;
  font-size: 24px;
  background-color: #304156;
  border-radius: 0;
  margin-right: 1px;
  justify-content: end;
}

.el-button.is-text:not(.is-disabled):focus, .el-button.is-text:not(.is-disabled):hover {
  background-color: #304156;
}


</style>