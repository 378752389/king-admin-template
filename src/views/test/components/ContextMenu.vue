<script setup>

import {ref} from 'vue';

const show = ref(false);

const openMenu = () => {
  show.value = true;
}

const closeMenu = () => {
  show.value = false;
}

const beforeEnter = (el) => {
  console.log(el)
  el.style.height = 0;
}

const enter = (el) => {
  console.log(el)

  el.style.height = 'auto';
  const height = el.clientHeight;
  console.log(height)
  el.style.height = 0;
  requestAnimationFrame(() => {
    el.style.height = height + 'px';
    el.style.transition = 'all 3s';
  })
}

const afterEnter = (el) => {
  console.log(el)
  el.style.transition = 'none';
}

defineExpose({
  openMenu,
  closeMenu
})
</script>

<template>


  <div class="context-menu">
    <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
      <ul v-if="show">
        <li>asd</li>
        <li>qwe</li>
        <li>zxc</li>
        <li>qza</li>
      </ul>
    </Transition>
  </div>

</template>

<style scoped>

</style>