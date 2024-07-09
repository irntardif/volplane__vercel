<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `page("${route.path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    category: true,
    published: 'page.date?.toDate("EEEE d MMMM YYYY")',
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
    dates: {
      query: 'page.content.dates.toStructure',
      select: {
        date: 'structureItem.date?.toDate("EEEE d MMMM YYYY")',
        hour: 'structureItem.hour',
        location: 'structureItem.location',
        url: 'structureItem.url',
      }
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
    embedsTest: 'page.embeds.toStructure',
    embeds: {
      query: 'page.embeds.toStructure',
      select:{
        input: 'structureItem.media.yaml.input',
        item: 'structureItem.media.toEmbed',
      }
    },
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page);


function transitorId(str: string) {
  return str.split('/').slice(-1);
}

const breadcrumb = [
  {target: '/blog' , name:'Journal'},
  {target: null , name: page.title},
]
</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-cover w-full lg:flex overflow-hidden">
      <div class="w-full lg:w-1/3 relative">
        <div class="absolute bottom-20 w-full">
          <span class="bg-vp--main py-3 px-20 w-full block text-xl font-bold mb-5">
            <span v-for="date in page?.dates" :key="date.date" class="block">{{ date.date }} </span>
          </span>
          <h1 class="text-3xl uppercase font-bold  px-20">{{ page?.title }}</h1>
        </div>
      </div>
      <figure class="w-full lg:w-2/3 h-full overflow-hidden relative">
        <div class="absolute bg-black w-full h-12 top-0 left-0 z-30 overflow-hidden">
          <div class="w-[300%] animate-slide">
            <span v-for="n in 20" :key="n" class="text-white uppercase text-xl font-bold py-2.5 px-5 inline-block">{{ page?.category }}</span>
          </div>
        </div>
        <img 
          v-if="page?.cover" 
          class="w-full h-full object-cover -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute" 
          :srcset="page?.cover?.srcset"
          :width="page?.cover?.width"
          :height="page?.cover?.height"
          :src="page?.cover?.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
    </section>
    <section id="about">
      <div class="w-full lg:w-2/3 lg:px-20 bg-vp--main py-10 lg:py-20 max-w-4xl text-l lg:text-2xl md:px-10">
        <div class="text w-full px-5 lg:px-0" v-html="page?.about"></div>
        <div v-if="page?.docs.length" class="mt-10 px-5 lg:px-0">
            <a v-for="doc in page?.docs" :key="doc.id" :href="doc.docFile ? doc.docFile.url : doc.url" :title="doc.title" target="_blank">
              <button class="button-shadow text-xl uppercase py-4 px-10 bg-white font-bold mb-5 mr-5">{{ doc.title }}</button>
            </a>
        </div>
        <!-- <div v-if="page?.gallery.length" class="mt-20 px-5 lg:px-0">
          <div v-for="image in page?.gallery" :key="image.uid" class="inline-block w-1/4" >
            <figure>
               <img 
                class="" 
                :srcset="image.srcset"
                :width="image.width"
                :height="image.height"
                :src="image.url" 
                sizes="(min-width: 900px) 33vw,
                      (min-width: 600px) 25vw,
                      100vw"/>
            </figure>
          </div>
        </div> -->
        <div v-if="page?.embeds.length" class="mt-20 px-5 lg:px-0">
          <div v-for="(embed, index) in page?.embeds" :key="index">
            <figure v-if="embed.item" class="pb-[69%] relative h-0 overflow-hidden w-full" v-html="embed.item?.code"></figure>
            <iframe v-if="embed.input && embed.input.includes('transistor')" width="100%" height="180" frameborder="no" scrolling="no" seamless :src="`https://share.transistor.fm/e/${transitorId(embed.input)}`"></iframe>
          </div>
        </div>
      </div>
    </section>
    <section v-if="page?.gallery.length" class="h-[66vh] relative lg:my-10 p-5 lg:pr-0 lg:pl-20">
      <AppCarousel :images="page?.gallery" />
    </section>
    <AppBlogPrevNext />
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
