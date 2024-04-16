<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'text'>
}>()
</script>

<template>
  <div class="text" v-html="block.content.text" />
</template>

<style>

.layout .text + h3{
  margin-top:.5rem;
}

@media screen and (min-width:1024px){
  layout .text + h3{
    margin-top:2rem;
  }
}
</style>