<script setup>
import SideBar from '@/layout/components/SideBar.vue'
import NavBar from "@/layout/components/NavBar.vue";
import {RouterView} from 'vue-router';
import {useUserInfoStore} from "@/stores/userInfo";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const userInfoStore = useUserInfoStore();
const {menuList} = storeToRefs(userInfoStore);

// 侧边栏挂载时如果路由为空，则加载菜单栏
onMounted(() => {
  if (menuList.value.length === 0) {
    userInfoStore.getMenu();
  }
})
</script>

<template>
  <div class="view-port">
    <SideBar class="side-bar" :authed-route="menuList"/>
    <div class="main">
      <NavBar/>
      <div class="content">
        <el-scrollbar>
          <RouterView/>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.view-port {
  display: flex;
  width: 100vw;

  .side-bar {
    height: 100vh;
    background-color: #304156 !important;
  }

  .main {
    flex-grow: 1;
    overflow-x: hidden;

    .content {
      height: calc(100vh - 60px);
    }
  }

}
</style>