<template>
  <ul class="relative flex space-x-2 overflow-y-hidden overflow-x-scroll p-2">
    <li
      class="flex-shrink-0 select-none"
      v-for="(cat, k) in categories"
      :key="`cat-${k}`"
    >
      <span class="uppercase"> {{ cat }}</span> |
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
