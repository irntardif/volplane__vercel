<script setup lang="ts">
import { filename } from 'pathe/utils'
defineProps<{
  socials?: Record<string, any>
}>()

const glob = import.meta.glob('@/assets/icons/social/*.svg', { eager: true });
const images = Object.fromEntries(Object.entries(glob).map(([key, value]) => [filename(key), value.default]))
</script>

<template>
  <span class="social">
    <ul class="flex">
      <li v-for="social in socials" :key="social.id" class="w-8 h-8 relative mr-2">
        <a class="relative block" :href="social.url" target="_blank">
           <img :src="images[`${social.platform}`]" :alt="social.platform" />
        </a>
      </li>
    </ul>
  </span>
</template>

<style scoped>
  img{
    filter: invert(1);
  }
</style>
