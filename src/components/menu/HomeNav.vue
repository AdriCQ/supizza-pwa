<script setup lang="ts">
import { useDataStore } from "@/store";
import { computed } from "vue";
import CategorySlider from "@/components/sliders/CategorySlider.vue";

const dataStore = useDataStore();

const categories = computed(() =>
  dataStore.categories.filter((c) => c !== "ingredients")
);
</script>

<template>
  <header class="sticky top-0 z-10 bg-white p-2 shadow-xl">
    <h1 class="text-center text-lg">Su-PIzza</h1>
    <CategorySlider :categories="categories" />
  </header>
</template>
