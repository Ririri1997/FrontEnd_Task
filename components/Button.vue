<template>
 <button :class="['button']" @click="onClick">
   <slot />
 </button>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";


const emit = defineEmits(["click"]);

const onClick = () => {
 emit("click");
};
</script>

<style scoped lang="sass">
.button 
 background-color: #1976d2	
 color: #ffffff
 border: none
 padding: 8px 24px
 border-radius: 4px
 cursor: pointer
 transition: 250ms
 box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px
 line-height: 100%
 font-size: 20px

 &:hover 
   transition: 250ms
   background-color: #2969a8
</style>
