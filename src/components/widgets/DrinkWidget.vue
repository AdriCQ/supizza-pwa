<script setup lang="ts">
import type { Drink } from "@/types";
import { toCurrency, setDefaultImage } from "@/helpers";

defineProps<{
  data: Drink;
}>();
</script>

<template>
  <div class="card w-full p-2" v-if="data">
    <div class="grid grid-cols-5 gap-2">
      <div class="col-span-2">
        <img
          :src="data.urlImg.small"
          :alt="data.nombre"
          :title="data.nombre"
          class="w-full"
          @error="setDefaultImage"
        />
      </div>
      <div class="col-span-3">
        <h3 class="overflow-title text-lg font-bold">
          {{ data.nombre }}
        </h3>
        <p class="overflow-description">Quedan {{ data.stock }}</p>
        <div class="absolute bottom-0 right-0 text-xl font-bold">
          {{ toCurrency(data.precio) }}
        </div>
      </div>
    </div>
  </div>
</template>
