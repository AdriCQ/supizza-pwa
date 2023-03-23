<script setup lang="ts">
import BaseIcon from "../BaseIcon.vue";
import { ROUTE_NAME } from "@/router";
import { useRouter } from "vue-router";
import { useDataStore } from "@/store";
import { computed } from "vue";
import { toCurrency } from "@/helpers";
import { mdiArrowRight, mdiCart } from "@mdi/js";

interface IProps {
  label: string;
  next: ROUTE_NAME;
}

defineProps<IProps>();

const $dataStore = useDataStore();
const $router = useRouter();
const cart = computed(() => $dataStore.cart);
const qty = computed(() => {
  let ret = 0;
  cart.value.offers.forEach((offer) => {
    ret += offer.qty;
  });
  return ret;
});
</script>

<template>
  <nav
    id="nav-bottom"
    class="sticky bottom-0 p-4"
    @click="() => $router.push({ name: next })"
  >
    <div
      class="flex items-center justify-between gap-2 rounded-full border bg-primary p-4 shadow-xl"
    >
      <div class="relative">
        <BaseIcon
          :icon="mdiCart"
          size="1.5rem"
          class="fill-slate-800 stroke-slate-700"
        />
        <div class="absolute -top-3 -right-1">
          <div
            class="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white"
          >
            {{ qty }}
          </div>
        </div>
      </div>
      <div class="font-bold">Total {{ toCurrency(cart.price) }}</div>
      <div class="ml-2 h-6 border border-slate-700"></div>
      <div class="font-bold">{{ label }}</div>
      <BaseIcon
        :icon="mdiArrowRight"
        size="1.5rem"
        class="fill-slate-800 stroke-slate-700"
      />
    </div>
  </nav>
</template>
