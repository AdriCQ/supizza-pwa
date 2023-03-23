<template>
  <ul class="relative flex overflow-y-hidden overflow-x-scroll p-2">
    <li
      class="flex-shrink-0 select-none"
      v-for="(cat, k) in categories"
      :key="`cat-${k}`"
      @click="() => goToCategory(cat)"
    >
      <span class="uppercase"> {{ cat }}</span>
      <span class="mx-4 h-6 border border-slate-600"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ categories: string[] }>();

function goToCategory(cat: string) {
  const element = document.querySelector(`#${cat}-section`);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "end" });
}
</script>

<style scoped>
ul::-webkit-scrollbar {
  display: none;
}
</style>
