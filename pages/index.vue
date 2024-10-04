<script setup lang="ts">
import {onMounted, ref} from 'vue';

const route = useRoute();
const site = useSite();

const { data } = await useKql({
  query: `page("home")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    headline: true,
    subheadline: true,
    categories: 'site.find(\'blog\').categories.yaml',
    courses: {
      query: 'page.courses.toPages',
      select: {
        id: true,
        title: true,
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
    },
    blogFocus: {
      query: 'page.blogFocus.toPages',
      select: {
        id: true,
        title: true,
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
    },
    showFocus: {
      query: 'page.showFocus.toPages',
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
      },
    },
  },
})

const getCurrentMonth = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

// const {data : lastShowFetch } = await useKql({
//   query: 'page("company").children.children.listed.first',
//   select: {
//     id: true,
//     title: true,
//     tags: true,
//     onTour: true,
//     cover: {
//       query: 'page.content.cover.toFile',
//       select: {
//         srcset: true,
//         width: true,
//         height: true,
//         thumb: true,
//         resized: {
//           query: 'file.resize(900, 900)',
//           select: ['url'],
//         },
//         alt: true,
//       },
//     },
//   },
// })

//const lastShow = lastShowFetch.value?.result;

const isSmallDevice = ref(false);

onMounted(() => {
  isSmallDevice.value = window.innerWidth >= 1024 ? false : true;
})


</script>

<template>
  <div class="home">
    <!-- Landing -->
    <section class="home-landing bg-black w-full -mt-[80px] relative">
      <img v-if="!isSmallDevice" class="absolute w-full h-auto left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 hidden lg:block lg:max-w-[950px] xl:max-w-[1200px] 2xl:max-w-[1600px]" src="~/assets/icons/maison_home.png" alt="Home - Compagnie Vol Plané"/>
      <img class="absolute w-[80%] lg:w-[20%] max-w-[550px] h-auto top-1/2 lg:top-20 left-5 lg:left-auto lg:right-20 -translate-y-1/2 lg:translate-y-0" src="~/assets/icons/words.png" alt="Création, Expérimentation, Transmission - Compagnie Vol Plané" />
      <!-- <NuxtLink
        v-if="!isSmallDevice"
        :to="`/company`"
        :aria-current="
          route.path.startsWith(`/company`) ? 'page' : undefined
        "
        class="w-36 2xl:w-80 h-40 absolute left-[32%] top-[32%] cursor-pointer pulse cursor-pointer transition-all hidden lg:block">
        <img class="absolute w-[200px] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="~/assets/icons/arrow-yellow.png" alt="Compagnie Vol Plané" />
      </NuxtLink>
      <NuxtLink
        v-if="!isSmallDevice"
        :to="`/school`"
        :aria-current="
          route.path.startsWith(`/company`) ? 'page' : undefined
        "
        class="w-36 2xl:w-80 h-40 absolute right-[22%] top-[40%] 2xl:top-[55%] cursor-pointer pulse cursor-pointer transition-all hidden lg:block">
        <img class="absolute w-[200px] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="~/assets/icons/arrow-white.png" alt="L'échapée belle Théâtre école"/>
      </NuxtLink> -->
    </section>
    <!-- Landing -->
    
    <AppHeader/>
    <!-- Calendrier-->
    <section v-if="site.calendar[Object.keys(site.calendar)[0]]" class="mt-20">
      <header class="container">
        <h2 class="fancy-title text-3xl uppercase font-bold mb-7 pr-7 inline-block">À venir</h2>
      </header>
      <div class="bg-vp--secondary text-white py-10 mb-px">
        <div class="container">
          <ul>
            <AppCalendarLine v-for="(date, index) in site.calendar[Object.keys(site.calendar)[0]]" :key="index" :date="date"/>
          </ul>
        </div>
      </div>
    </section>
    <!-- / Calendrier -->

    <!-- Journal -->
    <section v-if="page?.blogFocus.length" class="bg-vp--main reverse pb-2.5 lg:pb-0">
      <div class="container ">
        <header class="py-4 lg:pt-20 lg:flex justify-between">
          <h2 class="fancy-title fancy-dark text-3xl uppercase font-bold mb-7 inline-block">Journal</h2>
          <NuxtLink to="/blog" class="block my-auto flex">
            <span class="text-xl my-auto pr-2.5 font-bold">Tous les articles</span>
            <img class="w-32 my-auto" src="~/assets/icons/arrow-dark.png" alt="Tous les articles - Vol Plané">
          </NuxtLink>
        </header>
        <div class="grid lg:grid-cols-2 gap-y-10 lg:gap-y-0 gap-x-20 mb-20">
          <AppArticleThumbnail v-for="article in page?.blogFocus" :key="article.uid" :article="article" :categories="page?.categories" />
        </div>
      </div>
    </section>
    <!-- Journal -->

    <!-- Dernier Spectacle -->
    <section class="container">
      <header class="py-4 lg:pt-5 lg:flex justify-between">
        <h2 class="fancy-title text-3xl uppercase font-bold mb-7 inline-block">Spectacles en tournée</h2>
      </header>
      <div class="grid lg:grid-cols-2 gap-y-5 lg:gap-y-0 gap-x-20 mb-20 relative">
         <AppEventThumbnail v-for="show in page?.showFocus" :key="show.uid" :event="show" />
        <NuxtLink
        :to="`/repertoire`"
        :aria-current="
          route.path.startsWith(`/repertoire`) ? 'page' : undefined
        "
        class="block w-32 h-32 lg:w-40 lg:h-40 absolute -top-[25px] lg:-top-[65px] right-16 -translate-y-1/2 animate-rotate z-50">
        <AppRepertoireSVG/>
      </NuxtLink>
      </div>
    </section>
    <!-- Dernier Spectacle -->

    <!-- Parcours -->
    <section v-if="page?.courses.length" class="bg-vp--main reverse pb-2.5 lg:pb-0">
      <div class="container ">
        <header class="py-4 lg:pt-20 lg:flex justify-between">
          <h2 class="fancy-title text-3xl uppercase font-bold mb-7 inline-block fancy-dark">Focus sur les parcours</h2>
           <NuxtLink to="/school/courses" class="block my-auto flex">
            <span class="text-xl my-auto pr-2.5 font-bold">Tous les parcours</span>
            <img class="w-32 my-auto" src="~/assets/icons/arrow-dark.png" alt="Tous les articles - Vol Plané">
          </NuxtLink>
        </header>
        <div class="grid lg:grid-cols-2 gap-y-10 lg:gap-y-0 gap-x-20">
          <AppArticleThumbnail v-for="article in page?.courses" :key="article.uid" :article="article" :categories="page?.categories" />
        </div>
      </div>
    </section>
    <!-- Parcours -->

  

  </div>
</template>

<style scoped>
@media (pointer: none) {
  .home-landing{
    height: calc(66vh - 120px);
  }
}

.home-landing{
  height: calc(100vh - 90px);
}

@media screen and (min-width: 1200px){
  .home-landing{
    height: calc(100vh - 90px);
  }
}
</style>
