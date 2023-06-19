<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { setDefaultImage } from "@/helpers";
const CategorySlider = defineAsyncComponent(
  () => import("@/components/sliders/CategorySlider.vue")
);

const categories: string[] = ["Promos", "Pizzas", "Complementos", "Bebidas"];
</script>

<template>
  <header class="sticky top-0 z-10 bg-white p-2 shadow-xl">
    <div class="flex justify-center gap-2">
      <div class="w-16">
        <img
          src="/logo/logo.png"
          @error="setDefaultImage"
          alt="Supizza Logo"
          title="Supizza"
        />
      </div>
      <h1 class="select-none text-center text-2xl font-semibold">Su-Pizza</h1>
    </div>
    <CategorySlider :categories="categories" />
  </header>
</template>
