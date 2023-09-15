<script setup>

import SvgIcon from "@/components/SvgIcon.vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";

const route = useRoute();

const router = useRouter();

const logout = () => {
  router.push("/login")
}
</script>

<template>
  <div class="nav-bar">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :key="item.meta.title"
                          :to="{ path: item.path }"
                          v-for="item in route.matched">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

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

.breadcrumb {

}

.el-link {
  margin-right: 30px;
}

.el-avatar {
}
</style>