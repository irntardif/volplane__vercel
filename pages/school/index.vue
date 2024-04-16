<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $bus } = useNuxtApp() 

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
    manifesto: 'page.content.manifesto.kirbytext',
    history: 'page.history.toLayouts',
    project: 'page.project.toLayouts',
    companionship: 'page.companionship.toLayouts',
  },
})
const route = useRoute();
// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const menu = {
  anchor: false,
  items: [
    {title:'Manifeste', target: 'manifesto', visible:true},
    {title:'L\'histoire', target: 'history', visible:true},
    {title:'Le projet', target: 'project', visible:true},
    {title:'Le compagnonnage', target: 'companionship', visible:true},
  ]
};

const activeIndex = ref('manifesto');
const setIndex = (value) => {
  activeIndex.value = value;
}

onMounted(() => {
  //const { $bus }: any = this;
  $bus.$on('selectIndex', setIndex);
});

const breadcrumb = [
  {target: null , name:'L\'échappée Belle - Théâtre école'},
]

</script>

<template>
  <div>

    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-cover bg-white px-5 lg:px-0">
      <figure class="w-full h-full overflow-hidden relative">
        <img 
          v-if="page?.cover"
          class="w-full h-full object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute" 
          :srcset="page?.cover?.srcset"
          :width="page?.cover?.width"
          :height="page?.cover?.height"
          :src="page?.cover?.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
      <NuxtLink
        to="/school/courses"
        :aria-current="
          route.path.startsWith(`/school/courses`) ? 'page' : undefined
        "
        class="block fixed top-1/2 right-5 overflow-hidden z-30">
        <div class="w-32 h-32 relative">
          <img class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 max-w-[80px]" src="~/assets/icons/rocher.png" />
          <img class="animate-rotate h-full z-10 max-w-[180px] relative left-0" src="~/assets/icons/logo-parcours.svg" />
        </div>
      </NuxtLink>
    </section>
    <AppSubMenu :menu="menu" :active-index="activeIndex" />
    <div v-if="activeIndex === 'manifesto'" id="manifesto" class="relative">
      <div class="text w-full lg:w-2/3 md:px-10 lg:px-20 bg-vp--main py-10 lg:py-20 xl:text-xl px-5 lg:px-0 2xl:text-2xl max-w-2xl xl:max-w-4xl -mt-120 relative absolute t-0">
        <div class="text" v-html="page?.manifesto"></div>
      </div>
       <img src="~/assets/icons/phare.png" class="fixed w-[40%] top-48 left-[40%] -z-10" alt="La Compagnie Vol Plané" />
    </div>
    <KirbyLayouts v-if="activeIndex === 'history'" id="history" class="my-10 lg:my-20 container" :layouts="page?.history ?? []" />
    <KirbyLayouts v-if="activeIndex === 'project'" id="project" class="my-10 lg:my-20  container" :layouts="page?.project ?? []" />
    <KirbyLayouts v-if="activeIndex === 'companionship'" id="companionship" class="my-10 lg:my-20  container" :layouts="page?.companionship ?? []" />
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
