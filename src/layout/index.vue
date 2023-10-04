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
  <div class="view">
    <div class="side-bar-wrapper">
      <SideBar :authed-route="menuList"/>
    </div>

    <div class="main-wrapper">
      <div class="nav-bar-wrapper">
        <NavBar/>
      </div>

      <div class="content-wrapper">
        <RouterView/>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.view {
  display: flex;
  width: 100vw;

  .side-bar-wrapper {
    min-height: 100vh;
    background-color: #304156 !important;
  }

  .main-wrapper {
    flex-grow: 1;
    overflow-x: hidden;

    .content-wrapper {
      padding: 10px 30px 10px 20px;
      min-height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
    }
  }

}
</style>