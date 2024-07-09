<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `page("${route.path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    about: 'page.about.kt',
    subHeader: 'page.subHeader.kt',
    access: 'page.access.kt',
    geoloc: 'page.geoloc.yaml',
    editorial: 'page.editorial.toLayouts',
    partners: {
      query: 'page.partners.toStructure',
      select: {
        link: 'structureItem.link',
        icon: {
          query: 'structureItem.icon.toFile',
          select: ['id', 'url', 'srcset', 'width', 'height'],
        }
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
  {target: '/infos' , name:'Infos Pratiques'},
]

const locationView = ref(null);
const findView = ref(null);
const partnersView = ref(null);
const editorialView = ref(null);

const menu = {
  anchor: true,
  items:[
    {title:'Le lieu', target: 'location', visible: true, isInView: useElementVisibility(locationView) },
    {title:'Nous trouver', target: 'find-us', visible: true, isInView: useElementVisibility(findView)},
    {title:'Les partenaires', target: 'partners', visible: true, isInView: useElementVisibility(partnersView)},
    {title:'Plus d\'infos', target: 'editorial', visible: page?.editorial.length, isInView: useElementVisibility(editorialView)},
  ]
};
// const map = document.getElementById('map-id');
// const marker = new mapboxgl.Marker()
// .setLngLat([page?.geoloc.lon, page?.geoloc.lat])
// .addTo(map);

</script>

<template>
  <div class="infos">
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="uppercase font-bold text-4xl xl:text-6xl max-w-sm text-center mx-auto lg:my-5">{{ page?.title }}</h1>
        <img 
          class="w-full max-w-[300px] xl:max-w-[500px] relative top-[75%] left-1/2 -translate-x-1/2"
          :alt="page?.title"
          src="~/assets/icons/underline.svg" />
      </div>
    </section>
    <AppSubMenu :menu="menu" />
    <section id="location" ref="locationView" class="container grid grid-cols-3 my-20 gap-10">
      <header class="col-span-3">
         <h2 class="text-xl lg:text-3xl uppercase font-bold inline-block" v-html="page?.subHeader"></h2>
      </header>
      <div class="col-span-3 lg:col-span-2">
        <figure>
          <img 
            v-if="page?.cover"
            class="" 
            :alt="`${page?.title} - Vol Plané compagnie`"
            :srcset="page?.cover?.srcset"
            :width="page?.cover?.width"
            :height="page?.cover?.height"
            :src="page?.cover?.url" 
            sizes="(min-width: 900px) 33vw,
                  (min-width: 600px) 25vw,
                  100vw" />
        </figure>
      </div>
      <div class="col-span-3 lg:col-span-1">
        <div class="text" v-html="page?.about"></div> 
        <NuxtLink
          to="/school"
          :aria-current="
            route.path.startsWith(`/company`) ? 'page' : undefined
          ">
          <img class="w-[200px] h-auto my-10 hover:opacity-50" src="~/assets/icons/logo-eb-noir.jpg" alt="L'échapée belle Théâtre école" />
        </NuxtLink>
      </div>
    </section>
    <section id="find-us" ref="findView" class="container grid grid-cols-1 lg:grid-cols-3 lg:my-32 gap-10 lg:mb-80">
      <header class="col-span-3">
        <h2 class="fancy-title text-xl lg:text-3xl uppercase font-bold mb-2.5 lg:mb-7 inline-block">Nous trouver : </h2>
      </header>
      <div class="col-span-3 lg:col-span-2 relative -mt-12 mb-[450px] lg:mb-[0]">
         <MapboxMap
          v-if="page?.geoloc"
          map-id="map-id"
          style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%; height:450px"
          :options="{
            style: 'mapbox://styles/bonjourtardif/cl09dn0fg001214l98o0gkabx', // style URL
            center: [page?.geoloc.lon, page?.geoloc.lat], // starting position
            zoom: 14 // starting zoom
          }"
        >
         <MapboxDefaultMarker 
            marker-id="marker1"
            :options="{}"
            :lnglat="[page?.geoloc.lon, page?.geoloc.lat]"
          >
        </MapboxDefaultMarker>
       </MapboxMap>
      </div>
      <div class="text lg:-mt-12" v-html="page?.access"></div> 
    </section>
    <section id="partners" ref="partnersView" class="container my-16 lg:my-32">
       <h2 class="fancy-title text-xl lg:text-3xl uppercase font-bold mb-7 inline-block mt-12">Les partenaires</h2>
       <div class="grid grid-cols-2 lg:grid-cols-4 lg:gap-5">
         <div v-for="(partner, index) in page?.partners" :key="`partner_${index}`">
          <component :is="partner?.link ? 'a' : 'span'" :href="partner.link" target="_blank">
             <figure class="w-full pb-[56%] relative">
              <img
class="w-full h-full object-contain -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute"  
                :alt="partner.icon?.alt"
                :srcset="partner.icon?.srcset"
                :width="partner.icon?.width"
                :height="partner.icon?.height"
                :src="partner.icon?.url" 
                sizes="(min-width: 900px) 33vw,
                      (min-width: 600px) 25vw,
                      100vw" />
             </figure>
          </component>
         </div>
       </div>
    </section>
    <section id="editorial" class="bg-white py-10 lg:py-20 lg:pt-10">
      <div class="container">
        <KirbyLayouts ref="editorialView" class="text-xl lg:text-2xl" :layouts="page?.editorial ?? []" />    
      </div>
    </section>
  </div>
</template>

<style>

.infos .text a{
  text-decoration: underline;
}

.mapboxgl-marker svg{
  display:none;
}

.mapboxgl-marker{
  background: url('~/assets/icons/arrow-marker.png') no-repeat center;
  background-size:contain;
  width:55px;
  height:105px;
}

.infos #cover{
  height: 33vh;
}

@media screen and (min-width:1024px){
  .infos #cover{
    height: 50vh;
  }
}

</style>
