<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/store";

const $app = useAppStore();
const $dataStore = useDataStore();

onBeforeMount(async () => {
  try {
    await $dataStore.loadData();
  } catch (error) {
    $app.axiosError(error);
  }
});
</script>

<template>
  <main class="min-h-screen text-slate-800">
    <RouterView />
  </main>
</template>
