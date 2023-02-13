<script setup lang="ts">
import ElementSlider from "@/components/sliders/ElementSlider.vue";
import { useDataStore } from "@/helpers/pinia";
import { computed } from "vue";
const $dataStore = useDataStore();

const complements = computed(() => $dataStore.complements);
const drinks = computed(() => $dataStore.drinks);
const ingredients = computed(() => $dataStore.ingredients);
const pizzas = computed(() => $dataStore.pizzas);
const promos = computed(() => $dataStore.promos);
</script>

<template>
  <div>
    <h1 class="space-y-2">
      <ElementSlider
        type="complement"
        :elements="complements"
        v-if="complements"
      />
      <ElementSlider type="drink" :elements="drinks" v-if="drinks" />
      <ElementSlider
        type="ingredient"
        :elements="ingredients"
        v-if="ingredients"
      />
      <ElementSlider type="pizza" :elements="pizzas" v-if="pizzas" />
      <ElementSlider type="promo" :elements="promos" v-if="promos" />
    </h1>
  </div>
</template>
