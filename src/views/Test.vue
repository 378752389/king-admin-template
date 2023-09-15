<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
</script>

<template>
  <p>这是一个测试页面: {{ route.params.id}}</p>
</template>

<style scoped>
  p {
    margin-top: 50vh;
    transform: translateY(-50%);
    text-align: center;
  }
</style>