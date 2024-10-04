<script setup lang="ts">
defineProps<{
  images?: Record<string, any>
}>()
</script>

<template>
  <Swiper
    class="images-swiper"
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
    effect="slide"
    :navigation="true"
    slides-per-view="auto"
    :space-between="30"
  >
    <SwiperSlide v-for="image in images" :key="image.uid">
      <figure class="w-full h-full" :style="`width:${image.width}px`">
         <img 
          class="" 
          v-zoom
          :data-zoom-src="image.url"
          :srcset="image.srcset"
          :width="image.width"
          :height="image.height"
          :src="image.url" 
          sizes="(min-width: 900px) 33vw,
                (min-width: 600px) 25vw,
                100vw" />
      </figure>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>

.images-swiper {
  width: 100%;
  height: 100%;
}

.images-swiper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.images-swiper .swiper-slide {
  height: 100%;
  width:auto;
}


</style>
