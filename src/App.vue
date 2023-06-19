<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import { useAppStore, useDataStore, useUserStore } from "@/store";
/**
 * -----------------------------------------
 *	composables
 * -----------------------------------------
 */

const $app = useAppStore();
const $user = useUserStore();
const $store = useDataStore();

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const user = computed(() => $user.user);
/**
 * -----------------------------------------
 *	Lifecycle
 * -----------------------------------------
 */

onBeforeMount(async () => {
  // Cargar usuario del storage
  $user.load();

  // Pedidos al servidor
  try {
    // Cargar direcciones
    if (user.value) {
      await $user.getAddress();
    }
    // Obtener ofertas
    await $store.getOffers();
  } catch (error) {
    $app.axiosError(error);
  }
});
</script>

<template>
  <main class="min-h-screen bg-white text-slate-800">
    <RouterView />
  </main>
</template>
