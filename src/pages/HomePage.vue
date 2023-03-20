<script setup lang="ts">
import OfferGroup from "@/components/groups/OfferGroup.vue";
import HomeNav from "@/components/menu/HomeNav.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import { useDataStore } from "@/store";
import { computed, onBeforeMount } from "vue";
import { ROUTE_NAME } from "@/router";

const $dataStore = useDataStore();

const drinks = computed(() => $dataStore.drinks);
const pizzas = computed(() => $dataStore.pizzas);
const promos = computed(() => $dataStore.promos);

const cart = computed(() => $dataStore.cart);

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <HomeNav />

  <div class="mt-2 space-y-2 px-6">
    <SearchForm />

    <OfferGroup type="promos" link :elements="promos" v-if="promos" />
    <OfferGroup type="pizzas" link :elements="pizzas" v-if="pizzas" />
    <OfferGroup type="drinks" link :elements="drinks" v-if="drinks" />
  </div>

  <NavBottom
    label="Ver Carrito"
    :next="ROUTE_NAME.CART"
    v-if="cart.offers.length"
  />
</template>
