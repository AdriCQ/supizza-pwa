<script setup lang="ts">
import NavTop from "@/components/menu/NavTop.vue";
import OrderOffer from "@/components/widgets/OrderOffer.vue";
import { useDataStore } from "@/store";
import { CartOffer } from "@/types";

const $cart = useDataStore();

const cartOffer: CartOffer = {
  qty: 5,
  type: "pizzas",
  offer: $cart.pizzas?.at(0),
};
</script>

<template>
  <NavTop back="back" />
  <div class="mt-12 p-2">
    <div
      class="my-2 rounded-md bg-slate-200 p-2"
      v-for="i in 10"
      :key="`order-${i}`"
    >
      <div class="text-right">{{ i }}</div>
      <div class="mt-2">
        <OrderOffer :cart-offer="cartOffer" />
      </div>
    </div>
  </div>
</template>
