<script setup lang="ts">
  
defineProps<{
  article?: Record<string, any>
  categories?: Record<string, any>
}>()

const route = useRoute()

const defineCat = (cats, id) =>{
  if(!cats || !id){
    return
  }
  return cats.find(cat => cat.id === id).title;
}

</script>

<template>
    <NuxtLink
      class="block relative w-full"
      :to="`/${article?.id}`"
      :aria-current="
        route.path.startsWith(`/${article?.id}`) ? 'page' : undefined
      "
    >
      <figure class="w-full h-0 pb-[69%] overflow-hidden relative bg-vp--main">
        <img 
          v-if="article.cover"
          class="w-full h-full object-cover top-0 left-0 absolute hover:scale-105 transition-all" 
          :srcset="article.cover?.srcset"
          :width="article.cover?.width"
          :height="article.cover?.height"
          :src="article.cover?.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
      <div class="card bg-vp--main py-2.5 lg:py-5 px-5 lg:px-10 lg:left-1/2 relative lg:bottom-20 font-bold">
        <div v-if="article?.dates?.length" class="card-inner relative -top-5 -left-5 lg:-left-10 py-5 bg-black text-white overflow-hidden">
          <div class="w-[650%] lg:w-[900%] xl:w-[750%] flex top-2 animate-slide absolute top-0 left-0 h-20 py-1 lg:py-0">
            <template v-for="n in 10" :key="n">
              <span class="uppercase block w-fit pr-5 relative">
                 {{ article?.dates[0]?.date }}
              </span>
            </template>
          </div>
        </div>
        <h2 class="text-xl xl:text-2xl uppercase font-bold block">{{ article?.title }} </h2>
        <span class="block xl:py-2.5 first-letter:uppercase font-normal">{{ defineCat(categories, article?.category) }} </span>
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

  .reverse .card{
    background: #000;
    color:#fff;
  }
  
</style>
