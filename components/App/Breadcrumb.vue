<script setup lang="ts">
defineProps<{
  breadcrumb?: Record<string, any>
}>()

</script>

<template>
  <nav class="breadcrumb bg-vp--main sticky top-[60px] lg:top-[80px] left-0 w-full h-[40px] z-40">
    <ul class="px-5 md:px-10 lg:px-20">
      <li v-for="item in breadcrumb" :key="item.target" class="inline-block pr-2 py-2"><NuxtLink :to="item.target">{{ item.name }}</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
  li:after{
    content:"";
    display : inline-block;
    height : 0;
    width : 0;
    border-top : 4px solid transparent;
    border-bottom : 5px solid transparent;
    border-left : 5px solid #000;
    margin-left:12px;
  }
   li:last-child:after{
    display:none;
   }
</style>
