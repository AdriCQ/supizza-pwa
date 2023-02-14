<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/helpers/pinia";
import NavBottom from "@/components/menu/NavBottom.vue";

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
  <div class="min-h-screen">
    <main class="mb-24">
      <RouterView />
    </main>

    <div class="fixed bottom-0 z-10 w-full p-4">
      <NavBottom class="w-full" />
    </div>
  </div>
</template>
