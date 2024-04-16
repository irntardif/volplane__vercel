<script setup lang="ts">
const site = useSite()
// const listedChildren = computed(() =>
//   (site.value?.children ?? []).filter((i) => i.isListed),
// )

const companyMenu = [
  {id:'/company#about', title:'À propos'},
  {id:'/company#artists', title:'Les artistes'},
  {id:'/company#team', title:'L\'équipe'},
  {id:'/repertoire', title:'Répertoire'}
];

const schoolMenu = [
  {id:'/school#manifesto', title:'Manifeste'},
  {id:'/school#history', title:'Histoire'},
  {id:'/school#project', title:'Le projet'},
  {id:'/school#companionship', title:'Le compagnonnage'},
  {id:'/school/courses', title:'Les parcours'}
];

const infosMenu = [
  {id:'/calendar', title:'Calendrier'},
  {id:'/blog', title:'Journal'},
  {id:'/infos', title:'Infos Pratiques'},
]

</script>

<template>
  <footer class="footer bg-black text-white px-[20px] lg:px-[80px] py-12 relative z-40">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 md:col-span-3 lg:col-span-2 p-5 lg:p-7 relative">
        <img class="w-full" src="~/assets/icons/vp-blanc.svg" alt="Compagnie Vol Plané" />
      </div>

      <div class="col-span-6 md:col-span-3 lg:col-span-2">
        <NuxtLink to="/company"><h2 class="uppercase font-bold">La Compagnie</h2></NuxtLink>
        <ul class="mb-5">
          <li v-for="item in companyMenu" :key="item.id">
            <NuxtLink v-router-links :to="`${item.id}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="block lg:hidden col-span-6 md:col-span-3 lg:col-span-2 p-2.5 lg:p-7 relative">
        <img class="w-5/6" src="~/assets/icons/echappee.svg" alt="L'échappée belle théâtre école" />
      </div>

      <div class="block lg:hidden md:col-span-3 md:mb-7 lg:mb-0 col-span-6 lg:col-span-2">
        <NuxtLink to="/school"><h2 class="uppercase font-bold">Le théâtre-école</h2></NuxtLink>
        <ul>
          <li v-for="item in schoolMenu" :key="item.id">
            <NuxtLink v-router-links :to="`${item.id}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="col-span-6 md:col-span-3 lg:col-span-2">
        <NuxtLink to="/infos"><h2 class="uppercase font-bold">Informations</h2></NuxtLink>
        <ul class="mb-5">
          <li v-for="item in infosMenu" :key="item.id">
            <NuxtLink v-router-links :to="`${item.id}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>


      <div class="col-span-6 md:col-span-3 lg:col-span-2"></div>

      <div class="col-span-6 md:col-span-3 lg:col-span-2 mb-10">
        <h2 class="uppercase font-bold mb-2.5">Nous suivre</h2>
        <ul>
          <li v-for="item in site.social" :key="item.platform" class="inline-block">
            <a :href="item.url" target="_blank" :class="`icon icon_${item.platform}`"></a>
          </li>
        </ul>
      </div>

      <div class="col-span-6 md:col-span-3 lg:col-span-2">
        <h2 v-if="site.newsletter" class="uppercase font-bold"><a :href="site.newsletter" target="_blank">Newsletter</a></h2>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="hidden lg:block col-span-2 p-2.5 lg:p-7 relative">
        <img class="w-3/4 m-auto" src="~/assets/icons/echappee.svg" alt="L'échappée belle théâtre école" />
      </div>

      <div class="hidden lg:block col-span-2">
        <NuxtLink to="/school"><h2 class="uppercase font-bold">Le théâtre-école</h2></NuxtLink>
        <ul>
          <li v-for="item in schoolMenu" :key="item.id">
            <NuxtLink v-router-links :to="`${item.id}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="col-span-6 lg:col-span-2">
        <h2 class="uppercase font-bold">Contact</h2>
        <div v-html="site.address"></div>
        <p>{{ site.phone }}</p>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </div>

      <div class="col-span-6 md:col-span-3 lg:col-span-2"></div>
      <div class="col-span-6 md:col-span-3 lg:col-span-2"><p>© {{ site.title }} {{ new Date().getFullYear() }} </p></div>
    </div>
    <img class="absolute block w-24 left-1/2 md:w-[200px] 2xl:w-[300px] lg:left-auto lg:right-20 bottom-12" src="~/assets/icons/zig-blanc.svg" alt="Compagnie Vol Plané" />
  </footer>
</template>

<style scoped>

</style>