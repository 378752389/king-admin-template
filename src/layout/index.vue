<script setup>
import SideBar from '@/layout/components/SideBar.vue'
import NavBar from "@/layout/components/NavBar.vue";
import {RouterView} from 'vue-router';
import {useUserInfoStore} from "@/stores/userInfo";
import {storeToRefs} from "pinia";

const {menuList} = storeToRefs(useUserInfoStore());

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
        <!--        <el-scrollbar>-->
        <!--          <RouterView/>-->
        <!--        </el-scrollbar>-->
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