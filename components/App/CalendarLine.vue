<script setup lang="ts">
defineProps<{
  date?: Record<string, any>
}>()
const route = useRoute()

const getFormatedDate = (time) => {
  const date = new Date(time);
    
  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  
  return `${day} ${month} ${year}`;
}
</script>

<template>
  <li class="flex flex-wrap border-b border-white py-2.5 lg:py-5 last:border-none">
    <span class="text-l lg:text-2xl w-2/3 lg:w-[20%] my-auto">{{getFormatedDate(date.date) }}</span> 
    <span class="w-1/3 lg:w-[7%] my-auto text-right lg:text-left"><span v-if="date.hour">> {{date.hour}}</span></span>
    <span class="text-l xl:text-2xl font-bold uppercase w-full lg:w-[28%] my-auto pr-4 lg:max-w-[400px]"><NuxtLink
    :to="date.template == 'show' ? `repertoire/`+date.uri : `blog/`+date.uri"
    :aria-current="
      route.path.startsWith(date.uri) ? 'page' : undefined">{{date.title}}</NuxtLink></span> 
    <span class="lg:w-[20%] my-auto pr-4"><span class="capitalize" v-if="date.category">{{date.category}}</span></span> 
    <span class="lg:w-[20%] my-auto"><component :is="date.url != '' ? 'a' : 'span'" target="_blank" :href="date.url">{{date.location}}</component></span>
  </li>
</template>

<style scoped></style>
