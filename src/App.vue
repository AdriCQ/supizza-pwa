<script lang="ts" setup>
import { computed, defineAsyncComponent, onBeforeMount } from "vue";
import { useAppStore, useDataStore, useUserStore } from "@/store";
/**
 * -----------------------------------------
 *	Components
 * -----------------------------------------
 */

const NotificationContainer = defineAsyncComponent(
  () => import("@/components/NotificationContainer.vue")
);
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
  $store.loadStorage();
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
    <Suspense>
      <RouterView />
    </Suspense>

    <NotificationContainer class="fixed right-0 top-0 z-50" />
  </main>
</template>
