<script setup>
import SideBar from '@/layout/components/SideBar.vue'
import NavBar from "@/layout/components/NavBar.vue";
import {RouterView} from 'vue-router';
import {useUserInfoStore} from "@/stores/userInfo";
import {onMounted} from "vue";

const userInfoStore = useUserInfoStore();

// 侧边栏挂载时如果路由为空，则加载菜单栏
onMounted(async () => {
  // 加载用户基本信息
  await userInfoStore.getInfo();
  // 加载菜单信息
  await userInfoStore.getMenu();
})
</script>

<template>
  <div class="view-port">
    <SideBar class="side-bar"/>
    <div class="main">
      <NavBar/>
      <div class="content">
        <el-scrollbar>
          <RouterView v-slot="{Component}">
            <Transition name="fade" mode="out-in">
<!--              <KeepAlive :max="3">-->
                <component :is="Component"/>
<!--              </KeepAlive>-->
            </Transition>
          </RouterView>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

// fade styles!
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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