<script setup lang="ts">
import { IPromo } from "@/types";

defineProps<{ promo: IPromo }>();
</script>

<template>
  <div class="relative w-full bg-white">
    <img
      :src="promo.img"
      :alt="promo.title"
      :title="promo.title"
      class="w-full"
    />

    <div
      class="absolute bottom-1 left-1 w-full rounded-full bg-slate-100 p-2 text-center text-sm opacity-90"
    >
      {{ promo.title }}
    </div>
  </div>
</template>
