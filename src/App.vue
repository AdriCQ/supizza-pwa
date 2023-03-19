<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/store";
import { useRoute } from "vue-router";
import { ROUTE_NAME } from "./router";

const $app = useAppStore();
const $dataStore = useDataStore();
const $route = useRoute();

const showNav = computed(
  () =>
    $route.name !== ROUTE_NAME.OFFER_DETAILS &&
    $route.name !== ROUTE_NAME.MAP_SELECTOR
);

onBeforeMount(async () => {
  try {
    await $dataStore.loadData();
  } catch (error) {
    $app.axiosError(error);
  }
});
</script>

<template>
  <main class="min-h-screen text-slate-800" :class="{ 'mb-20': showNav }">
    <RouterView />
  </main>
</template>
