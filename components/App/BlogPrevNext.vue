<script setup lang="ts">
import { blogQuery } from '~/queries';

const route = useRoute();

// Explicitly not using `computed` here
const page = usePage().value

const { data } = await useKql(blogQuery)
const children = data.value?.result
const pageIndex = children?.findIndex(({ id }: any) => id === page?.id)

const getPath = (uid) => {
  if(!uid){
    return
  }
  const ar = uid.split('/');
  const fullPath = ar.slice(1).join('/');
  return `blog/${fullPath}`;
}
</script>

<template>
  <nav class="repertoire-prevnext">
    <div class="flex justify-between p-5 lg:px-20 py-10">
      <div class="w-1/2">
        <NuxtLink v-if="pageIndex !== undefined && pageIndex > 0" 
            :to="`/${getPath(children[pageIndex - 1]?.id)}`"
            :aria-current="
          route.path.startsWith(`/${children[pageIndex - 1]?.id}`) ? 'page' : undefined
        " class="block flex"> 
          <img class="rotate-180 w-[100px] md:w-[200px]" src="~/assets/icons/arrow-yellow.png" alt="Prev - Vol Plané" />
          <span class="ml-2.5 md:ml-5 hidden md:block my-auto text-sm md:text-lg font-bold">{{ children[pageIndex - 1]?.title }}</span>
        </NuxtLink>
      </div>
      <div class="w-1/2">
          <NuxtLink v-if="pageIndex !== undefined && pageIndex < children.length - 1"
         :to="`/${getPath(children[pageIndex + 1]?.id)}`"
         :aria-current="
          route.path.startsWith(`/${children[pageIndex + 1]?.id}`) ? 'page' : undefined"
          class="block flex justify-end">
            <span class="hidden md:block my-auto text-sm md:text-lg font-bold"> {{ children[pageIndex + 1]?.title }} </span>
            <img class="ml-2.5 md:ml-5 w-[100px] md:w-[200px] my-auto" src="~/assets/icons/arrow-yellow.png" alt="Next - Vol Plané" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  a > span{
    opacity:0;
    transition: opacity .3s ease-in;
  }

  a:hover > span{
    opacity:1;
  }
</style>
