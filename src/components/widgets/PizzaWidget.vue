<script setup lang="ts">
import { IPizza } from "@/types";

defineProps<{ pizza: IPizza }>();
</script>

<template>
  <div class="relative w-full rounded-md bg-white">
    <img
      :src="pizza.img"
      :alt="pizza.title"
      :title="pizza.title"
      class="w-full"
    />
    <div
      class="absolute bottom-1 left-1 w-full rounded-full bg-slate-100 p-2 text-center text-sm opacity-90"
    >
      {{ pizza.title }}
    </div>
  </div>
</template>
