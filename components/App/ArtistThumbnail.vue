<script setup lang="ts">

  defineProps<{
  artist?: Record<string, any>
}>()

  const route = useRoute()

</script>

<template>
    <NuxtLink
      class="block thumb relative"
      :to="`/${artist?.id}`"
      :aria-current="
        route.path.startsWith(`/${artist?.id}`) ? 'page' : undefined
      "
    >
      <figure class="w-full h-0 pb-[100%] overflow-hidden relative bg-vp--main">
        <img 
        v-if="artist.cover"
          class="w-full h-full object-cover top-0 left-0 absolute" 
          :srcset="artist.cover?.srcset"
          :width="artist.cover?.width"
          :height="artist.cover?.height"
          :src="artist.cover?.resized.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
      <h2 class="text-xl uppercase font-bold pt-4">{{ artist?.title }}</h2>
      <h3 class="uppercase font-bold">{{ artist?.specialisation }}</h3>
    </NuxtLink>
</template>

<style>
.thumb:after{
  content:"";
  position: absolute;
  z-index:5;
}

.thumb:first-child:after,
.thumb:nth-child(3n+1):after{
  background: url(/assets/icons/zigzag-noir.png) no-repeat center;
  background-size:contain;
  width:220px;
  height:60px;
  top:15%;
  left:75%;
}


.thumb:nth-child(3n+2):after{
  background: url(/assets/icons/zigzag-jaune.png) no-repeat center;
  background-size:contain;
  width:220px;
  height:60px;
  top:55%;
  left:75%;
}

.swiper-slide .thumb:after{
  display:none;
}

</style>
