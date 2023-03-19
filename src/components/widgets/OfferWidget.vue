<script setup lang="ts">
import type { IPizza, IPromo, IDrink } from "@/types";
import { computed } from "vue";
import { toCurrency } from "@/helpers";

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
  <div class="card w-full p-2" v-if="offer">
    <div class="grid grid-cols-5 gap-2">
      <div class="col-span-2">
        <img
          :src="offer.img"
          :alt="(offer as IPromo).title??(offer as IDrink).name"
          :title="(offer as IPromo).title??(offer as IDrink).name"
          class="w-full"
        />
      </div>
      <div class="col-span-3 text-slate-700">
        <h3 class="overflow-title text-lg font-bold">
          {{ (offer as IPromo).title ?? (offer as IDrink).name }}
        </h3>
        <p class="overflow-description">
          {{ (offer as IPromo).desc }}
        </p>
        <div class="absolute bottom-0 right-0 text-xl font-bold">
          {{ toCurrency(offer.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow-title {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* 
$font-size: 15px;
$line-height: 1.4;
$lines: 3; 
*/
.overflow-description {
  display: block;
  display: -webkit-box;
  height: 63px;
  font-size: 15px;
  line-height: 1.4;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
