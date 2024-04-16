<script setup lang="ts">
import {ref} from 'vue';
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    categories: 'page.categories.yaml',
    about: 'page.about.toLayouts',
    articles: {
      query: 'page.children.listed',
      select: {
        id: true,
        title: true,
        category: true,
        published: 'page.date?.toDate("EEEE d MMMM YYYY")',
        dates: {
          query: 'page.content.dates.toStructure',
          select: {
            date: 'structureItem.date?.toDate("EEEE d MMMM YYYY")',
            hour: 'structureItem.hour',
            location: 'structureItem.location',
            url: 'structureItem.url',
          }
        },
        cover: {
          query: 'page.content.cover?.toFile',
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
        }
      }
    }
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const selectedArticles = ref(page?.articles);
const filterArticles = (id) => {
  selectedArticles.value = [];
  setTimeout(() =>{
    if(!id){
    return selectedArticles.value = page?.articles;
  }
  return selectedArticles.value = page?.articles.filter(article => article.category === id);
  }, 200)
}

const breadcrumb = [
  {target: null , name:'Journal'},
]
</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-1/3">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="uppercase font-bold text-4xl xl:text-6xl max-w-sm text-center mx-auto my-5">{{ page?.title }}</h1>
        <img 
          class="w-full max-w-[300px] xl:max-w-[500px] relative top-[75%] left-1/2 -translate-x-1/2"
          :alt="page?.title"
          src="~/assets/icons/underline.svg" 
         />
      </div>
    </section>

    <div class="bg-white py-20">
      <div class="container">
        <section id="articles">
          <nav class="filters mb-8 lg:mb-16">
            <ul>
              <li class="inline-block button-shadow text-sm lg:text-l uppercase py-3 px-8 font-bold bg-vp--main mr-10 cursor-pointer w-full md:w-auto mb-4" @click.prevent="filterArticles(null)">Tous les articles</li>
              <li v-for="(cat, index) in page?.categories" :key="index" class="inline-block button-shadow text-sm lg:text-l uppercase py-3 px-8 font-bold bg-vp--main mr-10 cursor-pointer w-full md:w-auto mb-4" @click.prevent="filterArticles(cat.id)">
                {{ cat.title }}
              </li>
            </ul>
          </nav>
          <Transition name="fade">
            <div v-if="selectedArticles.length" class="grid grid-cols-1 md:grid-cols-2 gap-y-10 lg:gap-y-0 md:gap-x-10 lg:gap-x-20 mb-40">
              <AppArticleThumbnail v-for="article in selectedArticles" :key="article.uid" :article="article" :categories="page?.categories" />
            </div>
          </Transition>
          <Transition name="fade">
            <div v-if="!selectedArticles.length" class="text-xl">Pas d'articles dans cette catégorie.</div>
          </Transition>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
#cover{
  height: 25vh;
}

.filters{
  width:calc(100% - 25px)
}

@media screen and (min-width: 1024px){
  #cover{
    height: 50vh;
  }
  .filters{
    width:100%;
  }
}
</style>