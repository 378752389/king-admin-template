<script setup>
import {ref, onMounted} from 'vue';

const advertiseModel = ref({})

onMounted(() => {
  advertiseModel.value = {
    name: '',
    startTime: '',
    endTime: '',
    publicStatus: '',
    pic: '',
    sort: '',
    href: '',
    description: ''
  }
})
</script>

<template>

</template>

<style scoped>

</style>