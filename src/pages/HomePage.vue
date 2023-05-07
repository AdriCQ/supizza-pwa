<script setup lang="ts">
import OfferGroup from "@/components/groups/OfferGroup.vue";
import HomeNav from "@/components/menu/HomeNav.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import { useDataStore } from "@/store";
import { computed, onBeforeMount, ref } from "vue";
import { ROUTE_NAME } from "@/router";
import type { Search, Drink, Pizza, Promo, Complement } from "@/types";
import OfferWidget from "@/components/widgets/OfferWidget.vue";

const $dataStore = useDataStore();

const complements = computed(() => $dataStore.complements);
const drinks = computed(() => $dataStore.drinks);
const pizzas = computed(() => $dataStore.pizzas);
const promos = computed(() => $dataStore.promos);

const search = ref<string>("");

const cart = computed(() => $dataStore.cart);
const searchElements = ref<Search[]>();
/**
 * handleSearch
 */
function handleSearch() {
  if (search.value) {
    searchElements.value = [];
    // Search complements
    complements.value?.forEach((c) => {
      if (
        c.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        (c.desc &&
          c.desc.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      ) {
        searchElements.value?.push({
          type: "complements",
          offer: c,
        });
      }
    });

    // Search drinks
    drinks.value?.forEach((c) => {
      if (
        c.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        (c.desc &&
          c.desc.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      ) {
        searchElements.value?.push({
          type: "drinks",
          offer: c,
        });
      }
    });

    // Search Promos
    promos.value?.forEach((c) => {
      if (
        c.title
          .toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()) ||
        (c.desc &&
          c.desc.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      ) {
        searchElements.value?.push({
          type: "promos",
          offer: c,
        });
      }
    });

    // Search Pizza
    pizzas.value?.forEach((c) => {
      if (
        c.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      ) {
        searchElements.value?.push({
          type: "pizzas",
          offer: c,
        });
      }
    });
  } else {
    searchElements.value = undefined;
  }
}

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <HomeNav />

  <div class="mt-2 space-y-2 px-6">
    <SearchForm v-model="search" @search="handleSearch" />

    <template v-if="searchElements && searchElements?.length">
      <OfferWidget
        v-for="(el, key) in searchElements"
        :key="`search-${el.type}-${key}`"
        link
        :drink="el.type === 'drinks' ? el.offer as Drink : undefined"
        :complement="el.type === 'complements' ? el.offer as Complement : undefined"
        :pizza="el.type === 'pizzas' ? el.offer as Pizza : undefined"
        :promo="el.type === 'promos' ? el.offer as Promo : undefined"
    /></template>

    <template v-else>
      <OfferGroup
        id="promos-section"
        type="promos"
        link
        :elements="promos"
        v-if="promos"
      />
      <OfferGroup
        id="pizzas-section"
        type="pizzas"
        link
        :elements="pizzas"
        v-if="pizzas"
      />
      <OfferGroup
        id="drinks-section"
        type="drinks"
        link
        :elements="drinks"
        v-if="drinks"
      />
      <OfferGroup
        id="complements-section"
        type="complements"
        link
        :elements="complements"
        v-if="complements"
      />
    </template>
  </div>

  <NavBottom
    label="Ver Carrito"
    :next="ROUTE_NAME.CART"
    v-if="cart.offers.length"
  />
</template>
