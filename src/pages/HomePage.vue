<script setup lang="ts">
import ElementSlider from "@/components/sliders/ElementSlider.vue";
import { useDataStore } from "@/helpers/pinia";
import { computed } from "vue";
const $dataStore = useDataStore();

const drinks = computed(() => $dataStore.drinks);
const pizzas = computed(() => $dataStore.pizzas);
const promos = computed(() => $dataStore.promos);
</script>

<template>
  <div class="mt-2 space-y-2">
    <div class="px-2">
      <ElementSlider type="promos" link :elements="promos" v-if="promos" />
    </div>
    <div class="px-2">
      <ElementSlider type="pizzas" link :elements="pizzas" v-if="pizzas" />
    </div>
    <div class="px-2">
      <ElementSlider type="drinks" link :elements="drinks" v-if="drinks" />
    </div>
  </div>
</template>
