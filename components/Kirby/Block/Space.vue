<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'space'>
}>()
</script>

<template>
  <div class="w-full h-10 lg:h-20 bg-white"></div>
</template>
