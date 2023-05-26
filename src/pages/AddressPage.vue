<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { mdiMap } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import { useDataStore, useUserStore } from "@/store";
import type { Address } from "@/types";
// Components
const BaseIcon = defineAsyncComponent(
  () => import("@/components/BaseIcon.vue")
);
const AddressForm = defineAsyncComponent(
  () => import("@/components/forms/AddressForm.vue")
);
const AddressWidget = defineAsyncComponent(
  () => import("@/components/widgets/AddressWidget.vue")
);
const NavBottom = defineAsyncComponent(
  () => import("@/components/menu/NavBottom.vue")
);
const NavTop = defineAsyncComponent(
  () => import("@/components/menu/NavTop.vue")
);

const $dataStore = useDataStore();
const $user = useUserStore();

const addressArray = computed<Address[]>(() => $user.address);
const cartOffers = computed(() => $dataStore.cart.offers);
const showForm = ref(false);

/**
 * -----------------------------------------
 *	methods
 * -----------------------------------------
 */

function onAddressCreated(newAddress: Address) {
  showForm.value = false;
}

/**
 * -----------------------------------------
 *	Lifecycle
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

    <div class="mt-4" v-if="showForm">
      <AddressForm @done="onAddressCreated" />
    </div>

    <div class="mt-4" v-else>
      <button class="btn-primary btn w-full" @click="() => (showForm = true)">
        Nueva
      </button>
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
    v-if="cartOffers.length && !showForm"
  />
</template>
