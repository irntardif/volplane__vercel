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

let isMailjetLoaded = false

useHead({
  script: [
            {
              hid: 'mailJet',
              src: 'https://app.mailjet.com/pas-nc-embedded-v1.js',
              defer: true,
              // Changed after script load
              callback: () => { isMailjetLoaded = true } 
            }
          ]
});

const breadcrumb = [
  {target: '/newsletter' , name:'Newsletter'},
]

</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative">
      <div class="absolute top-[40%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="uppercase font-bold text-4xl xl:text-6xl max-w-sm text-center mx-auto my-5">Inscription Newsletter</h1>
      </div>
       <img 
          class="absolute top-0 -z-20 w-full md:w-1/2 max-w-[600px] lg:w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt="Calendrier"
          src="~/assets/icons/cercle.png" 
         />
    </section>
    <div class="bg-white">
      <div class="container">
        <div class="text-2xl text-center max-w-2xl m-auto my-10" v-html="page?.text"></div>
        <iframe v-if="isMailjetLoaded" data-w-type="embedded" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://5sqp.mj.am/wgt/5sqp/xs6k/form?c=6d8f87f9" width="100%" style="height: 0;"></iframe>
      </div>
    </div>
  </div>
</template>

<style>
 iframe{
  outline:none;
  min-height: 700px;
 }


</style>