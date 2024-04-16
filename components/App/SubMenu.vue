<script setup lang="ts">

import { onMounted } from 'vue';
const props = defineProps<{
  menu?: Record<string, any>,
  activeIndex?: Record<string, any>,
}>()


const { $bus } = useNuxtApp();


const { activeIndex } = toRefs(props);

const selectIndex = (target) => {
  $bus.$emit('selectIndex', target);
}

const setScrollClasses = (inView) => {
  let $class = 'cursor-pointer block font-bold w-full h-full py-2 px-2 bg-vp--main-light ';
  if(!inView){
    return $class;
  }
  $class += inView.value ? ' inView ' : '';
  return $class;
}

const setAreaClasses = (target) => {
  let $class = 'cursor-pointer block font-bold w-full h-full py-2 px-2 bg-vp--main-light ';
  $class += activeIndex.value === target ? ' active ' : '';
  return $class;
}

onMounted(() => {
  // handle active menu on scroll
  document.addEventListener('scroll', () => { 
    const els = document.querySelectorAll('.inView');
    if(!els.length){
      return 
    }
    if (els.length > 1){
      els[0].classList.remove('active');
      els[els.length - 1].classList.add('active');
    }else{
      els[0].classList.add('active');
    }
  });
})

</script>

<template>

  <nav class="submenu flex flex-wrap w-full top-[100px] lg:top-[120px] sticky lg:h-[40px] z-30 bg-white">
    <template v-for="(item, index) in menu.items" :key="`menu_${index}`">
      <span v-if="item.visible" class="block flex-auto text-center bg-white hover:bg-vp--main uppercase m-auto">
        <a v-if="menu.anchor" v-router-links :href="`#${item.target}`" :class="setScrollClasses(item.isInView)">{{ item.title }}</a>
        <a v-else v-router-links :href="`#${item.target}`" :class="setAreaClasses(item.target)" @click="selectIndex(item.target)">{{ item.title }}</a>
      </span>
    </template>
  </nav>
</template>

<style>

/*  .show .submenu a.bg-vp--main-light:not(.active){
    background-color:#fff;
  }*/

  a.active{
    background-color: rgb(var(--color-vp-main));
  }

</style>