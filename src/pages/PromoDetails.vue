<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setDefaultImage, toCurrency } from "@/helpers";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import type { Promo } from "@/types";
/**
 * -----------------------------------------
 *	Types
 * -----------------------------------------
 */
interface QtySelector {
  pizza: number[];
  complement: number[];
  drink: number[];
}
// Components
const NavTop = defineAsyncComponent(
  () => import("@/components/menu/NavTop.vue")
);
const MultipleSelector = defineAsyncComponent(
  () => import("@/components/forms/selectors/MultipleSelector.vue")
);
/**
 * -----------------------------------------
 *	Composables
 * -----------------------------------------
 */

const $dataStore = useDataStore();
const $route = useRoute();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const canComplete = ref(true);
const complementsAvailable = computed(() => promo.value?.complementos);
const drinksAvailable = computed(() => promo.value?.bebidas);
const pizzasAvailable = computed(() => promo.value?.pizzas);
const promo = ref<Promo>();
const qty = ref<number>(1);
const qtySelector = ref<QtySelector>({
  complement: [],
  drink: [],
  pizza: [],
});
const subtotal = computed(() => {
  if (promo.value) {
    return promo.value.precio * qty.value;
  }
  return 0;
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

/**
 * addToCart
 */
function addToCart() {
  if (canComplete.value) {
    void $router.push({ name: ROUTE_NAME.HOME });
  }
}

/**
 * onBeforeMount
 */
onBeforeMount(() => {
  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // obtener la promo
  const promoId = $route.params.promoId;
  const promoIndex = $dataStore.promos.findIndex((p) => p._id == promoId);
  if (promoIndex >= 0) {
    promo.value = $dataStore.promos[promoIndex];
  }

  // rellenar cantidad complemento
  promo.value?.complementos.forEach(() => {
    qtySelector.value.complement.push(0);
  });

  // rellenar cantidad bebida
  promo.value?.bebidas.forEach(() => {
    qtySelector.value.drink.push(0);
  });

  // rellenar cantidad pizza
  promo.value?.pizzas.forEach(() => {
    qtySelector.value.pizza.push(0);
  });

  console.log({
    promo: promo.value,
  });
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.HOME }" />

  <div class="relative" v-if="promo">
    <!-- Top mage -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="promo?.urlImg.medium"
        :src="promo?.urlImg.medium"
        @error="setDefaultImage"
        :alt="promo.nombre"
        :title="promo.nombre"
        class="w-full"
      />
    </div>
    <!-- / Top mage -->

    <!-- Content -->
    <section
      class="min-h-[15rem] translate-y-96 space-y-4 rounded-t-3xl bg-white px-4 pb-36 pt-8"
    >
      <div class="text-center text-slate-700">
        <h1 class="text-2xl">
          {{ promo.nombre }}
        </h1>
      </div>

      <!-- Pizzas -->
      <div class="rounded-md border bg-slate-200 p-4">
        <h3 class="text-center text-lg font-semibold">Pizzas</h3>

        <div
          class="mt-2"
          v-for="(pizza, pizzaIndex) in pizzasAvailable"
          :key="`pizza-available-${qtySelector.pizza[pizzaIndex]}-${pizzaIndex}`"
        >
          <div class="flex items-center">
            <div class="flex-1">{{ pizza.nombre }}</div>
            <div class="flex-none cursor-pointer">
              <MultipleSelector
                v-model="qtySelector.pizza[pizzaIndex]"
                can-add
              />
            </div>
          </div>
        </div>
      </div>
      <!-- / Pizzas -->

      <!-- bebidas -->
      <div
        class="rounded-md border bg-slate-200 p-4"
        v-if="drinksAvailable?.length"
      >
        <h3 class="text-center text-lg font-semibold">Bebidas</h3>

        <div
          class="mt-2"
          v-for="(drink, drinkIndex) in drinksAvailable"
          :key="`drink-available-${qtySelector.drink[drinkIndex]}-${drinkIndex}`"
        >
          <div class="flex items-center">
            <div class="flex-1">{{ drink.nombre }}</div>
            <div class="flex-none cursor-pointer">
              <MultipleSelector
                v-model="qtySelector.drink[drinkIndex]"
                can-add
              />
            </div>
          </div>
        </div>
      </div>
      <!-- / bebidas -->

      <!-- Complements -->
      <div
        class="rounded-md border bg-slate-200 p-4"
        v-if="complementsAvailable?.length"
      >
        <h3 class="text-center text-lg font-semibold">Complementos</h3>

        <div
          class="mt-2"
          v-for="(complement, complementIndex) in complementsAvailable"
          :key="`complement-available-${qtySelector.complement[complementIndex]}-${complementIndex}`"
        >
          <div class="flex items-center">
            <div class="flex-1">{{ complement.nombre }}</div>
            <div class="flex-none cursor-pointer">
              <MultipleSelector
                v-model="qtySelector.complement[complementIndex]"
                can-add
              />
            </div>
          </div>
        </div>
      </div>
      <!-- / Complements -->
    </section>
    <!-- / Content -->

    <div class="fixed bottom-0 w-full bg-white p-4">
      <div class="bg-slate-200 py-4 px-10">
        <div class="flex items-center">
          <div class="flex-1">Cantidad</div>
          <div class="flex-none cursor-pointer">
            <MultipleSelector v-model="qty" can-add />
          </div>
        </div>
      </div>
      <div
        class="btn-primary btn w-full"
        :class="{ 'btn-disabled': !canComplete }"
        @click="addToCart"
      >
        {{ toCurrency(subtotal) }}<span class="ml-2"> Añadir</span>
      </div>
    </div>
  </div>
</template>
