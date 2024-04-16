<script setup lang="ts">

defineProps<{
  event?: Record<string, any>
}>()

const route = useRoute()

/*/ old routing /*/
// const getPath = (uid) => {
//   if(!uid){
//     return
//   }
//   const ar = uid.split('/');
//   return ar.slice(1).join('/');
// }
</script>

<template>
    <NuxtLink
      class="block relative"
      :to="`/${event?.id}`"
      :aria-current="
        route.path.startsWith(`/${event?.id}`) ? 'page' : undefined
      "
    >
      <figure class="w-full h-0 pb-[69%] overflow-hidden relative">
        <img 
          class="w-full h-full object-cover top-0 left-0 absolute hover:scale-105 transition-all" 
          :srcset="event.cover?.srcset"
          :width="event.cover?.width"
          :height="event.cover?.height"
          :src="event.cover?.resized.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
     
      <div class="card bg-vp--main py-5 px-5 lg:px-10 lg:left-1/2 relative lg:bottom-14 font-bold">
        <div v-if="event?.onTour === 'true'" class="card-inner relative -top-5 -left-5 lg:-left-10 py-2.5 bg-black text-white overflow-hidden w-full z-30 h-10">
          <div class="w-[500%] xl:w-[400%] flex px-5 animate-slide absolute">
            <span v-for="n in 10" :key="n" class="uppercase block w-fit pr-5 lg:block">
               En tournée
            </span>
          </div>
        </div>
        <h2 class="text-xl xl:text-2xl uppercase font-bold">{{ event?.title }}</h2>
        <span v-if="event?.tags" class="block lg:py-2.5 font-normal">{{ event?.tags }}</span>
      </div> 
    </NuxtLink>
</template>

<style scoped>
  .card{
    width: 100%;
    position:relative;
    overflow:hidden;
    max-width:100%;
  }
  .card-inner{
    width: calc(100% + 40px);
  }

  @media screen and (min-width: 1024px){
    .card{
      width: calc(50% + 40px);
    }
    .card-inner{
      width: calc(100% + 80px);
    }
  }
  
</style>
