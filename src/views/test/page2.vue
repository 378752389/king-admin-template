<script setup>
import {onMounted, ref} from 'vue';

const boxRef = ref(null)
const contextMenuRef = ref(null)

onMounted(() => {
  // boxRef.value.addEventListener("contextmenu", function (e) {
  //   e.preventDefault()
  //   const x = e.clientX;
  //   const y = e.clientY;
  //   console.log(x, y)
  //   contextMenuRef.value.openMenu()
  // })

  arr.value = [1, 2, 3, 4, 5]
})

const arr = ref([])

const onBeforeEnter = (el) => {
  el.style.height = 0;
  el.style.overflow = 'hidden';
}
const onEnter = (el) => {
  el.style.height = 'auto';
  const height = el.clientHeight;
  console.log(height)
  el.style.height = 0;
  requestAnimationFrame(() => {
    el.style.height = height + 'px';
    el.style.transition = '1s';
  })
}
const onAfterEnter = (el) => {
  el.style.transition = 'none';
}

const show = ref(false)
const btnClick = () => {
  show.value = !show.value;
}
</script>

<template>
  <div class="page2">
    <div ref="boxRef" class="box"></div>

    <el-button @click="btnClick">Toggle</el-button>
    <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter">
      <div v-if="show" class="rect">
        <div class="item" :key="x" v-for="x in arr"></div>
      </div>
    </Transition>
  </div>

</template>

<style scoped>
.box {
  height: 300px;
  width: 300px;
  background-color: #13ce66;
}

.rect {
  width: 100px;
}

.item {
  width: 100px;
  height: 100px;
  background-color: deepskyblue;
  margin: 5px;
}


</style>