<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `page("${route.path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    published: 'page.date.toDate("c")',
    // description: true,
    social: 'page.social.toStructure',
    specialisation: 'page.specialisation',
    bio: 'page.bio.toLayouts',
    events: {
      query: 'page.repertoire.toPages',
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
    cover: {
      query: 'page.content.cover.toFile',
      select: ['id', 'url', 'srcset', 'width', 'height'],
    },
    // Required for image blocks and also for the cover fallback
    images: {
      query: 'page.images',
      select: ['id', 'uuid', 'url', 'alt'],
    },
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const breadcrumb = [
  {target: '/company#artists' , name:'Artistes'},
  {target: '' , name: page?.title}
]

</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <div class="container">
      <header>
        <h1 class="text-2xl lg:text-4xl uppercase font-bold my-5 lg:mb-10">{{ page?.title }}</h1>
      </header>
      <article class="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-10 mb-10 lg:mb-40">
        <div>
          <figure class="w-full h-0 pb-[120%] overflow-hidden relative">
            <img 
              class="w-full h-full object-cover top-0 left-0 absolute" 
              :srcset="page?.cover?.srcset"
              :width="page?.cover?.width"
              :height="page?.cover?.height"
              :src="page?.cover?.url" 
              sizes="(min-width: 900px) 33vw,
                    (min-width: 600px) 25vw,
                    100vw" />
          </figure>
          <div class="pt-4 text-center">
            <h2 class="text-l xl:text-xl uppercase pb-4 font-bold">{{ page?.specialisation }}</h2>
            <AppSocial class="justify-center flex" :socials="page?.social ?? []" />
          </div>
          
        </div>
        <div class="col-span-2">
          <KirbyLayouts class="text-lg" :layouts="page?.bio ?? []" />
        </div>
      </article>
      <section v-if="page?.events?.length" class="mb-20">
        <header>
          <h2 class="fancy-title text-2xl lg:text-3xl uppercase font-bold mb-7 inline-block">Répertoire</h2>
        </header>
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 lg:gap-x-20">
          <AppEventThumbnail v-for="event in page.events" :key="event.uid" :event="event" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
