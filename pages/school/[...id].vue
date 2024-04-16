<script setup lang="ts">
const { data } = await useKql({
  query: 'page("school/courses")',
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
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
    about: 'page.about.toLayouts',
    articles: {
      query: 'page.coursesArticles.toPages',
      select: {
        id: true,
        title: true,
        categories: 'page.parent.categories.yaml',
        category: true,
        published: 'page.date?.toDate("EEEE d MMMM YYYY")',
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

const breadcrumb = [
  {target: '/school' , name:'L\'échappée Belle - Théâtre école'},
  {target: null , name: page.title},
]
</script>

<template>
  <div>
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative h-cover">
    <figure class="w-full h-full overflow-hidden relative">
        <img 
          v-if="page?.cover"
          class="w-2/3 h-2/3 object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute"
          :alt="page?.title"
          :srcset="page?.cover.srcset"
          :width="page?.cover.width"
          :height="page?.cover.height"
          :src="page?.cover.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold text-4xl lg:text-6xl text-center">{{ page?.title }}</h1>
    </section>

    <div class="bg-white lg:py-10 lg:py-10">
      <div class="container">
        <KirbyLayouts id="about" class="mb-10" :layouts="page?.about ?? []" />

        <section id="articles">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-10 lg:gap-y-10 md:gap-x-10 lg:gap-x-20 mb-40">
            <AppArticleThumbnail v-for="article in page?.articles" :key="article.uid" :article="article" :categories="article.categories" />
          </div>
        </section>

      </div>
    </div>
  </div>
</template>


<style scoped>
  #cover{
    height:33vh;
  }

  @media screen and (min-width:1024px){
    #cover{
      height:calc(66vh - 250px);
    }
  }

</style>

