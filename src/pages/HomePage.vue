<script setup lang="ts">
import ElementSlider from "@/components/sliders/ElementSlider.vue";
import { useDataStore } from "@/helpers/pinia";
import { computed } from "vue";
const $dataStore = useDataStore();

const complements = computed(() => $dataStore.complements);
const drinks = computed(() => $dataStore.drinks);
const pizzas = computed(() => $dataStore.pizzas);
const promos = computed(() => $dataStore.promos);
</script>

<template>
  <div class="space-y-2">
    <div>
      <ElementSlider
        type="complement"
        :elements="complements"
        v-if="complements"
      />
    </div>

    <div>
      <ElementSlider type="drink" :elements="drinks" v-if="drinks" />
    </div>

    <div>
      <ElementSlider type="pizza" :elements="pizzas" v-if="pizzas" />
    </div>
    <div>
      <ElementSlider type="promo" :elements="promos" v-if="promos" />
    </div>
  </div>
</template>
