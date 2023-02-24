<script setup lang="ts">
import { useDataStore } from "@/helpers/pinia";
import { IComplement, IPizza } from "@/types";
import { computed, onBeforeMount } from "vue";

const $dataStore = useDataStore();

const cart = computed(() => $dataStore.cart);

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
  console.log({ cart: cart.value });
});
</script>

<template>
  <div class="p-2">
    <h3 class="text-xl">Total: ${{ Number(cart.price).toFixed(2) }}</h3>

    <div class="mt-2">
      <h4 class="text-lg">Carrito</h4>
      <div
        class="rounded-lg border p-2 shadow-md"
        v-for="(cartOffer, key) in cart.offers"
        :key="`cart-offer-${key}`"
      >
        {{
          cartOffer.type === "pizzas" || cartOffer.type === "promos"
            ? (cartOffer.offer as IPizza).title
            : (cartOffer.offer as IComplement).name
        }}
        <span class="ml-2">x{{ cartOffer.qty }}</span>
        <div
          class="flex flex-wrap gap-1"
          v-for="(additional, aKey) in cartOffer.additional"
          :key="`additional-${additional.id}-${aKey}-${key}`"
        >
          <div
            v-for="(selected, sKey) in additional.selected"
            :key="`additional-selected-${sKey}-a${additional.id}-s${selected.id}`"
          >
            <div class="rounded-full bg-slate-200 p-1">
              {{ selected.name }} x{{ selected.qty }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
