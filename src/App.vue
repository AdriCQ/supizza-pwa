<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/helpers/pinia";
import NavBottom from "@/components/menu/NavBottom.vue";
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
  <main class="min-h-screen" :class="{ 'mb-20': showNav }">
    <RouterView />
  </main>

  <div class="fixed bottom-0 z-10 w-full p-4" v-if="showNav">
    <NavBottom class="w-full" />
  </div>
</template>
