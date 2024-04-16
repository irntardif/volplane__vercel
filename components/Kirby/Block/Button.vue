<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'button'>
}>()
</script>

<template>
  <a :href="block.content.url ? block.content.url : block.content.file" :target="block.content.opennew === 'true' ? '_blank' : '_self'">
    <button class="button-shadow text-xl uppercase py-4 px-10 bg-vp--main font-bold my-5">{{ block.content.title }}</button>
  </a>
</template>
