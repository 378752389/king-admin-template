<script setup>

import SvgIcon from "@/components/SvgIcon.vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/app";
import {useUserInfoStore} from "@/stores/userInfo";

const appStore = useAppStore();
const userInfoStore = useUserInfoStore();
const {sidebarCollapse} = storeToRefs(appStore);

const route = useRoute();

const router = useRouter();

const logout = () => {
  userInfoStore.doLogout()
}

const doToggle = () => {
  appStore.toggleSideBar();
}
</script>

<template>
  <div class="nav-bar">
    <div class="left">

      <el-link class="collapse-btn" :underline="false" @click="doToggle">
        <SvgIcon :icon="sidebarCollapse ? 'king-expand': 'king-fold'"/>
      </el-link>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :key="item.meta.title"
                            :to="{ path: item.path }"
                            v-for="item in route.matched">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown placement="bottom-start">
      <el-link :underline="false">
        <el-avatar shape="square" src="https://avatars.githubusercontent.com/u/39339029?v=4"/>
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <SvgIcon icon="king-bell"/>
            通知
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <SvgIcon icon="king-switch-button"/>
            退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.nav-bar {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.left {
  display: flex;
  align-items: center;
  height: 100%;
}

.collapse-btn {
  font-size: 1.5em;
  line-height: 100%;
  margin-right: 20px;
}

.el-link {
  margin-right: 40px;
}


</style>