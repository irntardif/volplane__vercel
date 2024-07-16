<script setup lang="ts">

const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    // Required for image blocks and also for the cover fallback
    images: {
      query: 'page.images',
      select: ['id', 'uuid', 'url', 'alt', 'srcset'],
    },
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)


const breadcrumb = [
  {target: null , name:'Error'},
]

</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-cover">
    <figure class="w-full h-full overflow-hidden relative">
        <img src="~/assets/icons/brush.png" class="fixed h-[50vh] w-[100%] lg:h-[100%] object-cover top-10 left-0 -z-10" alt="La Compagnie Vol Plané" />
        <img 
          class="w-2/3 h-2/3 object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute" 
          :alt="page?.title"
          :srcset="page?.cover?.srcset"
          :width="page?.cover?.width"
          :height="page?.cover?.height"
          :src="page?.cover?.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
    </section>
    
    <div class="bg-white py-10 lg:py-20">
      <div class="container">
        COUCOU
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (pointer: none) {
  #cover{
    height:33vh;
  }
}

#cover{
  height:60vh;
}

@media screen and (min-width: 1200px){
  #cover{
    height:calc(66vh - 120px);
  }
}
</style>
