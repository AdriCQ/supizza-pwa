<template>
  <ul class="relative flex overflow-y-hidden overflow-x-scroll p-2">
    <li
      class="flex-shrink-0 select-none"
      v-for="(cat, k) in categories"
      :key="`cat-${k}`"
    >
      <span class="uppercase"> {{ cat }}</span>
      <span class="mx-4 h-6 border border-slate-600"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ categories: string[] }>();

function goToCategory(id: number) {
  const element = document.querySelector(`#category-products-group-${id}`);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "end" });
}
</script>

<style scoped>
ul::-webkit-scrollbar {
  display: none;
}
</style>
