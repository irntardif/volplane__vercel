<script setup lang="ts">
import {onMounted, ref} from 'vue';

const breadcrumb = [
  {target: '/calendar' , name:'Calendrier'},
]

const site = useSite();


const getCurrentMonth = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

const activeMonth = ref('Janvier');

const setActiveMonth = (value) => {
  activeMonth.value = value;
}

onMounted(() => {
  activeMonth.value = getCurrentMonth();
})
</script>

<template>
  <div class="calendar">
    <AppBreadcrumb :breadcrumb="breadcrumb" />
    <section id="cover" class="relative">
      <div class="absolute top-[40%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="uppercase font-bold text-4xl xl:text-6xl max-w-sm text-center mx-auto my-5">Calendrier</h1>
        <img 
          class="w-full max-w-[300px] xl:max-w-[500px] relative top-[75%] left-1/2 -translate-x-1/2"
          alt="Calendrier"
          src="~/assets/icons/underline.svg" 
         />
      </div>
    </section>
    <div class="container">
      <div class="flex mb-5 justify-between">
        <div class="w-1/2 lg:w-1/3">
          <AppVPSelect 
            class="bg-blue-200"
            :options="site.months"
            :default-value="getCurrentMonth()" 
            :tabindex="1" 
            @input="setActiveMonth" />
        </div>
        <span class="relative lg:-top-px py-2 px-5 lg:text-xl xl:text-[34px] uppercase font-bold">{{ site.season }}</span>
      </div>
    </div>
    <section class="bg-vp--secondary text-white py-5 lg:py-10 mb-px">
      <div v-if="site.calendar" class="container">
        <ul v-if="site.calendar[activeMonth]">
          <AppCalendarLine v-for="(date, index) in site.calendar[activeMonth]" :key="index" :date="date" />
        </ul>
        <p v-else class="text-xl lg:text-2xl">Pas d'évènements prévus.</p>
      </div>
    </section>
  </div>
</template>

<style>

@media (pointer: none) {
  #cover{
    height:33vh;
  }
}

#cover{
  height:33vh;
}

@media screen and (min-width: 1200px){
  #cover{
    height:calc(50vh - 120px);
  }
}

</style>
