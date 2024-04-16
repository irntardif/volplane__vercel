<script setup lang="ts">
import { blogQuery } from '~/queries'
import type { KirbyBlogResponse } from '~/queries'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'articles'>
}>()

const { data } = await useKql<KirbyBlogResponse>(blogQuery)

</script>

<template>
  <section class="my-10 md:my-20">
    
    <h2 class="fancy-title text-xl lg:text-3xl uppercase font-bold mb-2.5 lg:mb-7 inline-block">En savoir plus</h2>
    <div v-if="block.content.articles.length" class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-20 relative">
      <AppArticleThumbnail v-for="article in data?.result.filter(el => block.content.articles.includes(el.uuid))" :key="article.uid" :article="article" :categories="article.categories" />
    </div>
  </section>
</template>