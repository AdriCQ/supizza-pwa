<script setup lang="ts">
import { useDataStore } from "@/store";
import { computed, onBeforeMount } from "vue";
import OrderOffer from "@/components/widgets/OrderOffer.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiCart } from "@mdi/js";
import NavTop from "@/components/menu/NavTop.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import { ROUTE_NAME } from "@/router";

const $dataStore = useDataStore();

const cart = computed(() => $dataStore.cart);

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <NavTop back="back" />

  <div class="min-h-screen py-2 px-4">
    <div class="mt-2">
      <h1 class="text-center text-3xl font-semibold">
        <BaseIcon
          :icon="mdiCart"
          size="2rem"
          class="inline-block stroke-slate-800"
        />
        Carrito
      </h1>
      <div
        class="mt-8 rounded-lg bg-slate-200 py-2 px-6"
        v-if="cart.offers.length"
      >
        <div
          v-for="(cartoffer, key) in cart.offers"
          :key="`cart-${key}`"
          class="py-2"
        >
          <OrderOffer :cart-offer="cartoffer" />
          <div
            class="mt-4 border border-slate-800"
            v-if="key < cart.offers.length - 1"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <NavBottom
    label="Entrega"
    :next="ROUTE_NAME.CHECKOUT"
    v-if="cart.offers.length"
  />
</template>
