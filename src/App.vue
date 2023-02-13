<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAppStore, useDataStore } from "@/helpers/pinia";

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
    <RouterView />
  </div>
</template>
