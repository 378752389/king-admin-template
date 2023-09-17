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
      <SideBar :authed-route="menuList" />
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

<style scoped>
.view {
  display: flex;
  height: 100vh;
}

.main-wrapper {
  flex-grow: 1;
}
</style>