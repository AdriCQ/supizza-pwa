<script setup lang="ts">
import type { IPizza, IPromo, IDrink } from "@/types";
import { computed } from "vue";

const $props = defineProps<{
  drink?: IDrink;
  pizza?: IPizza;
  promo?: IPromo;
}>();

const offer = computed(() => {
  if ($props.drink) return $props.drink;
  else if ($props.pizza) return $props.pizza;
  else return $props.promo;
});
</script>

<template>
  <div class="card w-full" v-if="offer">
    <div class="w-full rounded-md bg-white p-1">
      <img
        :src="offer.img"
        :alt="(offer as IPromo).title??(offer as IDrink).name"
        :title="(offer as IPromo).title??(offer as IDrink).name"
        class="w-full"
      />
    </div>
    <div class="bg-white p-2">
      {{ pizza || promo ? (offer as IPizza).title : (offer as IDrink).name }}
    </div>
  </div>
</template>
