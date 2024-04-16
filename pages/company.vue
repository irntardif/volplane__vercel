<script setup lang="ts">

import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

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
    // breadcrumb: {
    //   query: 'page.breadcrumb',
    //   select: ['url', 'title'],
    // },
    about: 'page.about.toLayouts',
    team: 'page.team.toLayouts',
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
    artists: {
      query: 'page.artists.toPages',
      select: {
        id: true,
        title: true,
        specialisation: true,
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

const aboutView = ref(null);
const artistsView = ref(null);
const teamView = ref(null);

const route = useRoute();
const menu = {
  anchor: true,
  items:[
    {title:'À propos', target: 'about', visible:true, isInView: useElementVisibility(aboutView)},
    {title:'Les artistes', target: 'artists', visible:true, isInView: useElementVisibility(artistsView)},
    {title:'L\'équipe', target: 'team', visible:true, isInView: useElementVisibility(teamView)},
  ]
};

const breadcrumb = [
  {target: null , name:'Vol Plané - La Compagnie'},
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
    <NuxtLink
      to="/repertoire"
      :aria-current="
        route.path.startsWith(`/repertoire`) ? 'page' : undefined
      "
      class="block w-24 h-24 lg:w-56 lg:h-56 fixed bottom-5 lg:bottom-[40%] right-5 lg:right-10 animate-rotate z-40 max-w-[130px]">
      <AppRepertoireSVG />
    </NuxtLink>
    <AppSubMenu :menu="menu" />
    <div class="bg-white py-10 lg:py-20">
      <div class="container">
        <KirbyLayouts id="about" ref="aboutView" class="mb-20" :layouts="page?.about ?? []" />

        <section id="artists" ref="artistsView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 lg:mb-40 overflow-hidden">
          <AppArtistThumbnail v-for="artist in page?.artists" :key="artist.uid" :artist="artist" />
        </section>

        <KirbyLayouts id="team" ref="teamView" class="text-xl lg:text-2xl" :layouts="page?.team ?? []" />  
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
