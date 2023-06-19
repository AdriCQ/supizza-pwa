<script setup lang="ts">
import type { Promo } from "@/types";
import { toCurrency, setDefaultImage } from "@/helpers";

defineProps<{
  data: Promo;
}>();
</script>

<template>
  <div class="card w-full p-2 text-slate-800">
    <div class="grid grid-cols-5 gap-2">
      <div class="col-span-2">
        <img
          :src="data.urlImg.medium"
          :alt="data.nombre"
          :title="data.nombre"
          @error="setDefaultImage"
          class="w-full"
        />
      </div>
      <div class="col-span-3">
        <h3 class="overflow-title text-lg font-bold">
          {{ data.nombre }}
        </h3>
        <p class="overflow-description">
          {{ data.tipo }}
        </p>
        <div
          class="absolute bottom-0 right-0 text-xl font-bold"
          v-if="data.precio"
        >
          {{ toCurrency(data.precio) }}
        </div>
      </div>
    </div>
  </div>
</template>
