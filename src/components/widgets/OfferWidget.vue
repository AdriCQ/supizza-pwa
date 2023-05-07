<script setup lang="ts">
import type { Pizza, Promo, Drink, Complement, ResponseDataKey } from "@/types";
import { computed } from "vue";
import { toCurrency } from "@/helpers";
import { useRouter } from "vue-router";
import { useDataStore } from "@/store";
import { ROUTE_NAME } from "@/router";

const $props = defineProps<{
  drink?: Drink;
  pizza?: Pizza;
  promo?: Promo;
  complement?: Complement;
  link?: boolean;
}>();
const $router = useRouter();
const $dataStore = useDataStore();

const offer = computed(() => {
  if ($props.drink) return $props.drink;
  if ($props.pizza) return $props.pizza;
  if ($props.promo) return $props.promo;
  if ($props.complement) return $props.complement;
  return undefined;
});

const type = computed<ResponseDataKey>(() => {
  if ($props.drink) return "drinks";
  if ($props.complement) return "complements";
  if ($props.pizza) return "pizzas";
  if ($props.promo) return "promos";
  return "pizzas";
});

/**
 * selectElement
 */
function selectElement() {
  if ($props.link && offer.value) {
    $dataStore.selected = {
      type: type.value,
      value: offer.value,
    };
    $router.push({
      name: ROUTE_NAME.OFFER_DETAILS,
      query: { type: type.value, id: offer.value.id },
    });
  }

  console.log({
    type: type.value,
    value: offer.value,
  });
}
</script>

<template>
  <div v-if="offer" @click="selectElement">
    <div class="card w-full p-2" v-if="complement">
      <div class="grid grid-cols-5 gap-2">
        <div class="col-span-2">
          <img
            :src="complement.img"
            :alt="complement.name"
            :title="complement.name"
            class="w-full"
          />
        </div>
        <div class="col-span-3">
          <h3 class="overflow-title text-lg font-bold">
            {{ complement.name }}
          </h3>
          <p class="overflow-description">
            {{ complement.weight }}
          </p>
          <div class="absolute bottom-0 right-0 text-xl font-bold">
            {{ toCurrency(complement.price) }}
          </div>
        </div>
      </div>
    </div>

    <div class="card w-full p-2 text-slate-800" v-else>
      <div class="grid grid-cols-5 gap-2">
        <div class="col-span-2">
          <img
            :src="offer.img"
            :alt="(offer as Promo).title??(offer as Drink).name"
            :title="(offer as Promo).title??(offer as Drink).name"
            class="w-full"
          />
        </div>
        <div class="col-span-3">
          <h3 class="overflow-title text-lg font-bold">
            {{ (offer as Promo).title ?? (offer as Drink).name }}
          </h3>
          <p class="overflow-description">
            {{ (offer as Promo).desc }}
          </p>
          <div class="absolute bottom-0 right-0 text-xl font-bold">
            {{ toCurrency(offer.price) }}
          </div>
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
