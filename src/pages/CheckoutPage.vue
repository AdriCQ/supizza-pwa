<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon.vue";
import CheckoutForm from "@/components/forms/CheckoutForm.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import NavTop from "@/components/menu/NavTop.vue";
import { ROUTE_NAME } from "@/router";
import { mdiCart } from "@mdi/js";
</script>

<template>
  <NavTop back="back" />
  <div class="mt-2 p-2">
    <h1 class="text-center text-3xl font-semibold">
      <BaseIcon
        :icon="mdiCart"
        size="2rem"
        class="inline-block stroke-slate-800"
      />
      Carrito
    </h1>
  </div>
  <div class="p-2">
    <CheckoutForm />
  </div>

  <NavBottom label="Continuar" :next="ROUTE_NAME.HOME" />
</template>
