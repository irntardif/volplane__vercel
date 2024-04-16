<script setup lang="ts">
const { data } = await useKql({
  query: 'page("repertoire")',
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    subheadline: true,
    cover: {
      query: 'page.content.cover.toFile',
      select: {
        srcset: true,
        width: true,
        height: true,
        thumb: true,
        resized: {
          query: 'file.resize(900, 900)',
          select: ['url'],
        },
        alt: true,
      },
    },
    children: {
      query: 'page.children.listed',
      select: {
        id: true,
        title: true,
        tags: true,
        onTour: true,
        cover: {
          query: 'page.content.cover.toFile',
          select: {
            srcset: true,
            width: true,
            height: true,
            thumb: true,
            resized: {
              query: 'file.resize(900, 900)',
              select: ['url'],
            },
            alt: true,
          },
        },
      }
    },
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const breadcrumb = [
  {target: '/company' , name: 'Vol Plané - La Compagnie'},
  {target: null , name: page?.title},
]
</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-cover">
    <figure class="w-full h-full overflow-hidden relative">
        <img 
          v-if="page?.cover"
          class="w-3/4 h-3/4 object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute"
          :alt="page?.title"
          :srcset="page?.cover.srcset"
          :width="page?.cover.width"
          :height="page?.cover.height"
          :src="page?.cover.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
          <img src="~/assets/icons/zigzig.svg" alt="Compagnie Vol Plané" class="w-[45%] absolute right-0 top-[25%]" />
      </figure>
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold text-3xl xl:text-6xl">{{ page?.title }}</h1>
    </section>
    <div class="container mb-20">
       <div class="grid grid-cols-1  md:grid-cols-2 gap-y-10 lg:gap-y-0 md:gap-x-10 lg:gap-x-20">
        <AppEventThumbnail v-for="event in page?.children" :key="event.uid" :event="event" />
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

