<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'line'>
}>()
</script>

<template>
  <hr class="border-black my-5 lg:my-10" />
</template>
