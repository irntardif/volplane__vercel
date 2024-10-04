<script setup lang="ts">

import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const route = useRoute()
const parentRoute = computed(() => route.path.split('/').slice(0, -1).join('/'));
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    published: 'page.date.toDate("c")',
    tags: 'page.tags',
    onTour: 'page.onTour.toBool',
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
    about: 'page.content.about.kirbytext',
    docs: {
      query:'page.content.docs.toStructure',
      select: {
        title: true,
        url: true,
        docFile:{
           query:'structureItem.docFile.toFile',
           select: ['url']
        }
      }
    },
    gallery: {
      query: 'page.gallery.toFiles',
      select: ['id', 'uuid', 'url', 'alt', 'srcset'],
    },
    video: {
      query: 'page.video.toEmbed',
      select: ['code', 'url'],
    },
    credits: 'page.credits.toLayouts',
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
    production: 'page.production.kirbytext',
    prodDocs: {
      query:'page.content.prodDocs.toStructure',
      select: {
        title: true,
        url: true,
        docFile:{
           query:'structureItem.docFile.toFile',
           select: ['url']
        }
      }
    },
    dates: {
      query: 'page.content.dates.toStructure',
      select: {
        date: 'structureItem.date',
        hour: 'structureItem.hour',
        location: 'structureItem.location',
        url: 'structureItem.url',
      }
    },
    press : 'page.press.toStructure',
    related: {
      query: 'page.related.toPages',
      select: {
        id: true,
        title: true,
        specialisation: true,
        category: true,
        categories:'page.parent.categories.yaml',
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
setPage(page);

const aboutView = ref(null);
const distributionView = ref(null);
const calendarView = ref(null);
const moreView = ref(null);

const menu = {
  anchor: true,
  items:[
    {title:'À propos', target: 'about', visible: true, isInView: useElementVisibility(aboutView) },
    {title:'Distribution', target: 'credits', visible: true, isInView: useElementVisibility(distributionView)},
    {title:'Calendrier', target: 'calendar', visible: page?.dates.length, isInView: useElementVisibility(calendarView)},
    {title:'Aller + Loin', target: 'more', visible: page?.press.length || page?.related.length, isInView: useElementVisibility(moreView)},
  ]
};

const breadcrumb = [
  {target: '/company' , name: 'La Compagnie'},
  {target: '/repertoire' , name:'Répertoire'},
  {target: '' , name: page?.title},
]
</script>

<template>
  <div class="show">
    <AppBreadcrumb :breadcrumb="breadcrumb"/>
    <section id="cover" class="relative h-cover w-full overflow-hidden">
      <figure class="w-full h-full overflow-hidden relative bg-black">
        <div v-if="page?.onTour" class="absolute bg-black w-full h-12 top-0 left-0 z-30 overflow-hidden">
          <div class="w-[200%] animate-slide">
            <span v-for="n in 20" :key="n" class="text-white uppercase text-xl font-bold py-2.5 px-5 inline-block">En tournée</span>
          </div>
        </div>
        <img 
          v-if="page?.cover"
          class="w-full h-full object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute" 
          :srcset="page?.cover?.srcset"
          :width="page?.cover?.width"
          :height="page?.cover?.height"
          :src="page?.cover?.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw"/>
      </figure>
      <div class="lg:absolute bottom-20 left-20 px-10 py-5 z-20 bg-white">
        <span v-if="page?.tags" class="bg-black text-white absolute -top-[60%] left-0 py-2.5 px-10 w-full block text-xl mb-5">{{ page.tags }}</span>
        <h1 class="text-3xl uppercase font-bold hidden lg:inline-block">{{ page?.title }}</h1>
      </div>
    </section>
    
    <AppSubMenu :menu="menu" />

    <section id="about" ref="aboutView">
      <div class="grid grid-cols-3 relative lg:mb-10">

        <div class="relative col-span-3 lg:col-span-2">
          <div class="text w-full md:px-10 lg:px-20 px-5 lg:px-0 py-10 lg:py-20 lg:pb-40 bg-vp--main">
            <h1 class="text-2xl uppercase font-bold mb-5 lg:hidden ">{{ page?.title }}</h1>
            <div class="text text-lg md:text-2xl max-w-4xl" v-html="page?.about"></div>
          </div>
          
         <!--  <div v-if="page?.docs.length" class="mt-10">
              <a v-for="doc in page?.docs" :key="doc.id" :href="doc.docFile ? doc.docFile.url : doc.url" :title="doc.title" target="_blank">
                <button class="button-shadow text-l uppercase py-4 px-10 bg-white font-bold">{{doc.title}}</button>
              </a>
          </div> -->
        </div>
        <div class="w-full col-span-3 md:col-span-1">
          <div class="p-5 md:px-10 py-10 lg:py-20 bg-black text-white text text-sm">
            <!-- <KirbyLayouts id="credits0" class="mb-10 max-w-4xl" :layouts="page?.credits ?? []" /> -->
            <div class="max-w-xl" v-html="page?.production"></div>
            <div v-if="page?.prodDocs.length" class="mt-10">
              <a v-for="doc in page?.prodDocs" :key="doc.id" :href="doc.docFile ? doc.docFile.url : doc.url" :title="doc.title" target="_blank" >
                <button class="button-shadow button-shadow--alt text-black  uppercase py-2.5 px-5 bg-white font-bold mb-7 mr-5">{{doc.title}}</button>
              </a>
            </div>
          </div>
        </div>
        <div></div>
        <div v-if="page?.video" class="video-container col-span-3 md:col-span-2 relative bottom-0 p-5 lg:pl-0 lg:pr-20 lg:-mt-20">
          <div class="w-full pb-[56%] h-0 overflow-hidden relative">
            <figure class="video-block absolute w-full h-full bg-vp--main" v-html="page?.video?.code"></figure>
          </div>
        </div>
      </div>
    </section>

    <section v-if="page?.gallery.length" class="h-[66vh] relative lg:my-10 p-5 lg:pr-0 lg:pl-20">
      <AppCarousel :images="page?.gallery" />
    </section>
    
    <section id="credits" ref="distributionView" class="px-5 lg:px-20">
        <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
          :effect="'slide'"
          :slides-per-view="1"
          :navigation="true"
          :space-between="30"
          :breakpoints="{
          '1024': {
            slidesPerView: 3,
            spaceBetween: 20,
            },
          }"
        >
          <SwiperSlide v-for="artist in page?.artists" :key="artist.uid">
            <AppArtistThumbnail  :artist="artist" />
          </SwiperSlide>
        </Swiper>
    </section>
    
    <section id="calendar" ref="calendarView" class="relative mt-20">
      <div v-if="page?.dates.length" class="px-5 md:px-10 lg:px-20 bg-vp--secondary text-white py-10 relative">
        <ul>
            <AppCalendarLine v-for="(date, index) in page?.dates" :key="index" :date="date"/>
        </ul>
      </div>
    </section>

    <section v-if="page?.press.length || page?.related.length" id="more" ref="moreView" class="my-5 md:my-10 lg:my-20 px-5 md:px-10 lg:px-20">
      <div v-if="page?.press.length">
        <h2 class="text-2xl lg:text-3xl uppercase font-bold mb-7 inline-block">La presse en parle</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-5 lg:mb-20">
          <div v-for="article in page?.press" :key="article.id">
            <div v-html="article.text"></div>
            <div class="flex justify-between">
              <p class="font-bold uppercase text-xl my-2.5 inline-block">{{article.source}}</p>
              <a v-if="article.url" target="_blank" :href="article.url" class="relative inline-block"><span class="arrow-yellow"></span></a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="page?.related.length">
        <h2 class="fancy-title text-2xl lg:text-3xl uppercase font-bold mb-7 inline-block">Articles en lien</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 relative">
          <AppArticleThumbnail v-for="article in page?.related" :key="article.uid" :article="article" :categories="article.categories" />
        </div>
      </div>
    </section>
    <LazyAppRepertoirePrevNext />
  </div>
</template>

<style>

@media (pointer: none) {
 .show #cover{
    height:33vh;
  }
}

.show #cover{
  height:60vh;
}

@media screen and (min-width: 1200px){
  .show #cover{
    height:calc(66vh - 120px);
    min-height:600px;
  }
}

.arrow-yellow{
  display:inline-block;
  top:0;
  right:0;
  background: url(~/assets/icons/arrow-yellow.svg) no-repeat center;
  background-size:cover;
  width: 145px;
  height: 45px;

}

.video-block > iframe{
  width: 100%;
  height:100%;
  position:absolute;
  left:0;
  top:0;
}

@media screen and (min-width:1024px){
  .video-container:after{
    content:"";
    display:block;
    background: url(~/assets/icons/eclair.png) no-repeat center;
    background-size:contain;
    position:absolute;
    width:200px;
    height:200px;
    bottom:-135px;
    left:-180px;
    z-index:12;
    transform: scaleX(-1);
  }
}

</style>
