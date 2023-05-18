<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAppStore, useDataStore, useUserStore } from "@/store";
import { useService } from "@/services";

const $app = useAppStore();
const $user = useUserStore();
const { offers } = useService();
const $dataStore = useDataStore();

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
  $dataStore.fullData.promos = (await offers.listPromo()).data;
}

onBeforeMount(async () => {
  Promise.all([
    listComplements(),
    listDrink(),
    listIngredients(),
    listPizzas(),
    listPromos(),
  ]).catch((error) => {
    $app.error("Ha ocurrido un error");
    console.log({ load: error });
  });
  $dataStore.load();
  $user.load();
});
</script>

<template>
  <main class="min-h-screen bg-white text-slate-800">
    <RouterView />
  </main>
</template>
