<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useDataStore } from "@/store";
import { CartOffer, OrderCreate } from "@/types";
// Components
import NavTop from "@/components/menu/NavTop.vue";
import OrderOffer from "@/components/widgets/OrderOffer.vue";

const $cart = useDataStore();

const cartOffer: CartOffer = {
  qty: 5,
  type: "pizzas",
  offer: $cart.pizzas?.at(0),
};

onBeforeMount(() => {
  const order: OrderCreate = {
    Direccion: {
      direccion: "",
      lat: 0,
      lng: 0,
    },
    Nombre: "Nombre Cliente",
    Pago: "Efectivo",
    Productos: $cart.cart.offers,
    Telefono: "53535353",
    TipoEntrega: "Encontrarse afuera",
  };
});
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
