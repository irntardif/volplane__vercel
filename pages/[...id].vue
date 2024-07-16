<script setup lang="ts">
import { getPageQuery } from '~/queries'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql(getPageQuery(kirbyPath))

let data = pageData.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData } = await useKql(getPageQuery('error'))
  data = pageData.value
  setResponseStatus(useRequestEvent(), 404)
}

// Set the current page data for the global page context
const page = data?.result
setPage(page)

const breadcrumb = [
  {target: page?.uri , name: page?.title},
]

</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="uppercase font-bold text-4xl xl:text-6xl max-w-sm text-center mx-auto lg:my-5">{{ page?.title }}</h1>
        <img 
          class="w-full max-w-[300px] xl:max-w-[500px] relative top-[75%] left-1/2 -translate-x-1/2"
          :alt="page?.title"
          src="~/assets/icons/underline.svg" />
      </div>
    </section>
    
    <div class="bg-white py-10 lg:py-20">
      <div class="container">
        <div class="text-2xl text-center max-w-5xl m-auto" v-html="page?.text"></div>
      </div>
    </div>
  </div>
</template>
