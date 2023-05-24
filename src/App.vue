<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import { useAppStore, useDataStore, useUserStore } from "@/store";
import { useService } from "@/services";
import { DataAdditional, DataItem, Promo } from "./types";

const $app = useAppStore();
const $user = useUserStore();
const { offers } = useService();
const $dataStore = useDataStore();

const complementsItems = computed<DataItem[]>(() =>
  $dataStore.complements.map((complement) => ({
    desc: complement.desc,
    id: complement.id,
    name: complement.name,
    price: 0,
    qty: 0,
  }))
);
const drinksItems = computed<DataItem[]>(() =>
  $dataStore.drinks.map((drink) => ({
    desc: drink.desc,
    id: drink.id,
    name: drink.name,
    price: 0,
    qty: 0,
  }))
);
const pizzasItems = computed<DataItem[]>(() =>
  $dataStore.pizzas.map((pizza) => ({
    desc: pizza.title,
    id: pizza.id,
    name: pizza.title,
    price: 0,
    qty: 0,
  }))
);

async function listComplements() {
  $dataStore.fullData.complements = (await offers.listComplement()).data;
}

async function listDrink() {
  $dataStore.fullData.drinks = (await offers.listDrink()).data;
}

async function listIngredients() {
  $dataStore.fullData.ingredients = (await offers.listIngredient()).data;
}

async function listPizzas() {
  const resp = (await offers.listPizza()).data;
  // Corregir precio inicial
  $dataStore.fullData.pizzas = resp.map((pizza) => {
    let price = 0;
    pizza.ingredients.forEach((ingredient) => (price += ingredient.price));
    return {
      ...pizza,
      price,
    };
  });
}

async function listPromos() {
  const loadedPromos = (await offers.listPromo()).data;
  const setPromos: Promo[] = [];
  loadedPromos.forEach((promo) => {
    const promoAdditionals: DataAdditional[] = [];
    promo.additional.forEach((additional, additionalIndex) => {
      let items: DataItem[] = [];
      switch (additional.additional_type) {
        case "Bebidas":
          items = drinksItems.value;
          break;
        case "Complementos":
          items = complementsItems.value;
          break;
        default:
          items = pizzasItems.value;
      }

      promoAdditionals.push({
        ...additional,
        id: additionalIndex,
        items,
      });
    });

    setPromos.push({
      ...promo,
      additional: promoAdditionals,
    });
  });

  $dataStore.fullData.promos = setPromos;
}

onBeforeMount(async () => {
  await Promise.all([
    listComplements(),
    listDrink(),
    listIngredients(),
    listPizzas(),
  ]).catch((error) => {
    $app.error("Ha ocurrido un error");
    console.log({ load: error });
  });
  await listPromos();
  $dataStore.load();
  $user.load();
});
</script>

<template>
  <main class="min-h-screen bg-white text-slate-800">
    <RouterView />
  </main>
</template>
