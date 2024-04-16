<script setup lang="ts">
import { onMounted, onUpdated, ref, watch} from 'vue';
const route = useRoute()
const site = useSite()

const openMenu = ref(false);

watch(() => route.name, () => {
  openMenu.value = false;
});

onMounted(() => {
  openMenu.value = false;
})

onUpdated(() => {
  openMenu.value = false;
})

const handleMenuOpen = () => {
  openMenu.value = true;
  
}

</script>

<template>
  <header class="header fixed w-full h-[60px] lg:h-[80px] py-2.5 md:py-2 px-[20px] md:px-10 lg:px-20  z-50 left-0 bg-white">
    <div class="grid grid-cols-12 h-full relative">
      <NuxtLink class="logo block col-span-2" to="/" title="Accueil">
        <img class="w-20 md:w-14 lg:w-20 h-full" src="~/assets/icons/logo-maison.svg" alt="Accueil" />
      </NuxtLink>
      <nav class="menu hidden lg:flex col-span-7 relative h-full">
        <NuxtLink
          to="/company"
          :aria-current="
            route.path.startsWith(`/company`) ? 'page' : undefined
          "
          class="w-1/2 router-link block 2xl:text-l uppercase font-bold leading-none">
          Vol Plané <span class="pl-2.5 opacity-0">La compagnie</span>
        </NuxtLink>

        <NuxtLink
          to="/school"
          :aria-current="
            route.path.startsWith(`/school`) ? 'page' : undefined
          "
          class="w-1/2 router-link block 2xl:text-l uppercase font-bold leading-none">
          L'échappée belle <span class="pl-2.5 opacity-0">Théâtre-école</span>
        </NuxtLink>
      </nav>

      <div class="col-span-10 lg:col-span-3 flex justify-end z-50 relative">
        <button class="main-menu w-[80px] lg:w-[120px] h-full my-auto" @click.prevent="handleMenuOpen"></button>
      </div>
    </div> 
  </header>
  <Transition name="slide">
    <nav v-if="openMenu" id="menu" class="bg-black w-full md:w-[75%] h-screen fixed z-[999] top-0 right-0 text-white">
      <span class="close z-50 relative" @click.prevent="openMenu = false"></span> 
      <section class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute w-full px-10 lg:px-20 pt-20">
        <div class="grid grid-cols-6 md:grid-cols-12 mb-5 lg:mb-20 gap-10">
          <div class="col-span-2">
             <img class="w-full" src="~/assets/icons/vp-blanc.svg" alt="Compagnie Vol Plané" />
          </div>
          <div class="col-span-4">
            <NuxtLink v-router-links to="/company" class="block lg:text-xl xl:text-3xl uppercase font-bold mb-1 lg:mb-2.5 hover:text-vp--main">À propos</NuxtLink>
            <NuxtLink v-router-links to="/repertoire" class="block lg:text-xl xl:text-3xl uppercase font-bold mb-1 lg:mb-2.5 hover:text-vp--main">Répertoire</NuxtLink>
          </div>
          <div class="col-span-4 hidden md:block">
            <NuxtLink v-router-links to="/calendar" class="block text-xl lg:text-xl xl:text-3xl uppercase font-bold lg:mb-1 hover:text-vp--main">Calendrier</NuxtLink>
            <NuxtLink v-router-links to="/blog" class="block lg:text-xl xl:text-3xl uppercase font-bold hover:text-vp--main">Journal</NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-6 md:grid-cols-12 mb-10 md:mb-20 gap-10">
          <div class="col-span-2">
             <img class="w-[60%] m-auto" src="~/assets/icons/echappee.svg" alt="L'échappée belle théâtre-école" />
          </div>
          <div class="col-span-4">
            <NuxtLink v-router-links to="/school" class="block lg:text-xl xl:text-3xl uppercase font-bold mb-1 lg:mb-2.5 hover:text-vp--main">Le théâtre-école</NuxtLink>
            <NuxtLink v-router-links to="/school/courses" class="block lg:text-xl xl:text-3xl uppercase font-bold hover:text-vp--main">Les parcours</NuxtLink>
          </div>
          <div class="col-span-4 mt-10 md:mt-0">
            <NuxtLink v-router-links to="/infos" class="block lg:text-xl xl:text-3xl uppercase font-bold mb-1 lg:mb-2.5 hover:text-vp--main">Infos pratiques</NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-10">
          <div class="lg:col-span-6 md:hidden lg:block"></div>
          <div class="col-span-6 lg:col-span-3 xl:col-span-2">
            <h2 class="uppercase font-bold mb-2.5">Nous suivre</h2>
            <ul>
              <li v-for="item in site.social" :key="item.platform" class="inline-block">
                <a :href="item.url" target="_blank" :class="`icon icon_${item.platform}`"></a>
              </li>
            </ul>
          </div>
          <div class="lg:col-span-2">
            <a v-if="site.newsletter" :href="site.newsletter" target="_blank"><h2 class="uppercase font-bold mb-2.5">Newsletter</h2></a>
          </div>
        </div>
      </section>
    </nav>
  </Transition>
</template>

<style scoped>

.home > .header{
  position:sticky;
  top:0;
}

.menu a {
  padding-top: 1.5rem;
  display: block;
}


.main-menu{
  background: url(~/assets/icons/burger.png) no-repeat center;
  background-size:contain;
  width: 50px;
  height:50px;
}

a.router-link span{
  transition: opacity .5s ease;
}

a.router-link:hover span{
  opacity: 1;
}

span.close{
  background: url(~/assets/icons/close.png) no-repeat center;
  cursor:pointer;
  background-size:contain;
  position: absolute;
  top:50px;
  right:50px;
  display:block;
  width:55px;
  height:50px;
  transition: transform 1s ease;
}

span.close:hover{
  transform: rotate(180deg);
}

@media screen and (min-width:1024px){
  span.close{
    top:75px;
    right:75px;
  }
}
</style>
