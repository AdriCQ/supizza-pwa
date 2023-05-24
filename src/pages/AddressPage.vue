<script setup lang="ts">
import { computed, onMounted } from "vue";
import { mdiMap } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import { useDataStore, useUserStore } from "@/store";
import type { Address } from "@/types";
// Components
import BaseIcon from "@/components/BaseIcon.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import NavTop from "@/components/menu/NavTop.vue";
import AddressWidget from "@/components/widgets/AddressWidget.vue";

const $dataStore = useDataStore();
const $user = useUserStore();

const addressArray = computed<Address[]>(() => $user.address);

const cartOffers = computed(() => $dataStore.cart.offers);

/**
 * -----------------------------------------
 *	Lifexycle
 * -----------------------------------------
 */

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.CHECKOUT }" />
  <div class="min-h-screen p-4">
    <h1 class="text-center text-2xl font-semibold">
      <BaseIcon
        :icon="mdiMap"
        size="1.5rem"
        class="inline-block stroke-slate-800"
      />
      Direcciones
    </h1>

    <div class="mt-4">
      <button class="btn-primary btn w-full">Nueva</button>
      <AddressWidget
        class="my-2"
        v-for="(address, key) in addressArray"
        :key="`address-${key}`"
        :address="address"
      />
    </div>
  </div>

  <NavBottom
    label="Entrega"
    :next="ROUTE_NAME.CHECKOUT"
    v-if="cartOffers.length"
  />
</template>
