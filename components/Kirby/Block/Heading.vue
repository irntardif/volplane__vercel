<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component :is="block.content.level" :id="slugify(block.content.text)" class="font-bold uppercase">
    <span v-html="block.content.text" />
  </component>
</template>

<style scoped>
.layout h1{
  font-size:2rem;
  margin:12px 0;
  line-height:1.2;
}

.layout h2{
  font-size:1.5rem;
  margin:16px 0;
  line-height:1.2;
}

.layout h3{
  font-size:1rem;
  margin:1.5rem 0 .5rem 0;
  line-height:1.2;
}

.layout h3 + text{
  margin-top:2rem;
}

@media screen and (min-width:1024px){
  .layout h1{
    font-size:2.5rem;
    margin:24px 0;
  }

  .layout h2{
    font-size:2rem;
  }

  .layout h3{
    font-size:1.5rem;
  }
}
</style>
