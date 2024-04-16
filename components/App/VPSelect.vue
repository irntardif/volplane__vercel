<script setup lang="ts">
import {onMounted, ref } from 'vue';

const props = defineProps<{
  options?: Record<string, any>
  defaultValue?: string
  tabindex?: number
}>()

const emits = defineEmits(["input"]);

const open = ref(false);
const selected = ref(null);

const { defaultValue } = toRefs(props);

const handleSelect = (option) => {
  open.value = false;
  selected.value = option;
  emits('input', option);
}

onMounted(() => {
  selected.value = defaultValue.value || (options.length > 0 ? options[0] : null);
})
</script>

<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open }" @click="open = !open">
     {{ selected }} 
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) in options"
        :key="i"
        @click="handleSelect(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: #fff;
  color: #000;
  cursor: pointer;
  user-select: none;
  font-size:20px;
  font-weight:bold;
  text-transform:uppercase;
  background: 
}

/*.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}*/

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #000 transparent transparent transparent;
}

.custom-select .items {
  color: #000;
/*  border-radius: 0px 0px 6px 6px;*/
  overflow: hidden;
  border-right: 1px solid rgb(var(--color-vp-main));
  border-left: 1px solid rgb(var(--color-vp-main));
  border-bottom: 1px solid rgb(var(--color-vp-main));
  position: absolute;
  background-color: rgb(var(--color-vp-main));
  left: 0;
  right: 0;
  z-index: 99;
}

.custom-select .items div {
  color: #000;
  border-bottom: 1px solid #000;
  text-transform: uppercase;
  font-weight:bold;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #000;
  color:rgb(var(--color-vp-main));
}

.selectHide {
  display: none;
}

@media screen and (min-width: 1200px){
  .custom-select {
    height: 37px;
    line-height: 37px;
  }

  .custom-select .selected {
    font-size:34px;
  }
}
</style>
