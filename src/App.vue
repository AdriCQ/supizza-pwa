<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/store";
import { useService } from "@/services";

const $app = useAppStore();
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
  $dataStore.fullData.pizzas = (await offers.listPizza()).data;
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
});
</script>

<template>
  <main class="min-h-screen bg-white text-slate-800">
    <RouterView />
  </main>
</template>
