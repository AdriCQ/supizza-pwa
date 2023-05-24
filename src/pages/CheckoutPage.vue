<script setup lang="ts">
import { onBeforeMount } from "vue";
import { mdiCart } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import { useUserStore } from "@/store";
// Components
import BaseIcon from "@/components/BaseIcon.vue";
import CheckoutForm from "@/components/forms/CheckoutForm.vue";
import NavTop from "@/components/menu/NavTop.vue";

const $user = useUserStore();

onBeforeMount(async () => {
  $user.load();
  await $user.getAddress();
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.CART }" />
  <div class="mt-2 p-2">
    <h1 class="text-center text-3xl font-semibold">
      <BaseIcon
        :icon="mdiCart"
        size="2rem"
        class="inline-block stroke-slate-800"
      />
      Ordenar
    </h1>
  </div>
  <div class="p-2">
    <CheckoutForm />
  </div>

  <!-- <NavBottom label="Continuar" :next="ROUTE_NAME.HOME" v-if="user" /> -->
</template>
