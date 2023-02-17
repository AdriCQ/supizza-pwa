<script setup lang="ts">
import type { IDrink } from "@/types";

defineProps<{ drink: IDrink }>();
</script>

<template>
  <div class="relative w-full bg-white">
    <img
      :src="drink.img"
      :alt="drink.name"
      :title="drink.name"
      class="w-full"
    />

    <div
      class="absolute bottom-1 left-1 w-full rounded-full bg-slate-100 p-2 text-center text-sm opacity-90"
    >
      {{ drink.name }}
    </div>
  </div>
</template>
