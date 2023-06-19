<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onBeforeMount,
  ref,
} from "vue";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
// Components
const HomeNav = defineAsyncComponent(
  () => import("@/components/menu/HomeNav.vue")
);
const NavBottom = defineComponent(
  () => import("@/components/menu/NavBottom.vue")
);
const ComplementWidget = defineAsyncComponent(
  () => import("@/components/widgets/ComplementWidget.vue")
);
const DrinkWidget = defineAsyncComponent(
  () => import("@/components/widgets/DrinkWidget.vue")
);
const PizzaWidget = defineAsyncComponent(
  () => import("@/components/widgets/PizzaWidget.vue")
);
const PromoWidget = defineAsyncComponent(
  () => import("@/components/widgets/PromoWidget.vue")
);
const SearchForm = defineAsyncComponent(
  () => import("@/components/forms/SearchForm.vue")
);

const $store = useDataStore();

const complements = computed(() => $store.complements);
const drinks = computed(() => $store.drinks);
const pizzas = computed(() => $store.pizzas);
const promos = computed(() => $store.promos);

const search = ref<string>("");

const cart = computed(() => $store.cart);

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <HomeNav />

  <div class="mt-2 space-y-2 px-6">
    <SearchForm v-model="search" />
    <!-- Promos -->
    <section id="Promos-section" v-if="promos.length">
      <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
        Promociones
      </h2>
      <div
        v-for="(promo, promoKey) in promos"
        :key="`promo-${promoKey}-${promo._id}`"
      >
        <PromoWidget :data="promo" />
        <div class="my-4 border border-slate-300"></div>
      </div>
    </section>
    <!-- / Promos -->

    <!-- Pizzas -->
    <section id="Pizzas-section" v-if="pizzas.length">
      <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
        Pizzas
      </h2>
      <div
        v-for="(pizza, pizzaKey) in pizzas"
        :key="`pizza-${pizzaKey}-${pizza._id}`"
      >
        <PizzaWidget :data="pizza" />
        <div class="my-4 border border-slate-300"></div>
      </div>
    </section>
    <!-- / Pizzas -->

    <!-- Complementos -->
    <section id="Complementos-section" v-if="complements.length">
      <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
        Complementos
      </h2>
      <div
        v-for="(complement, complementKey) in complements"
        :key="`complement-${complementKey}-${complement._id}`"
      >
        <ComplementWidget :data="complement" />
        <div class="my-4 border border-slate-300"></div>
      </div>
    </section>
    <!-- / Complementos -->

    <!-- Bebidas -->
    <section id="Bebidas-section" v-if="drinks.length">
      <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
        Bebidas
      </h2>
      <div
        v-for="(drink, drinkKey) in drinks"
        :key="`drink-${drinkKey}-${drink._id}`"
      >
        <DrinkWidget :data="drink" />
        <div class="my-4 border border-slate-300"></div>
      </div>
    </section>
    <!-- / Complementos -->
  </div>

  <NavBottom label="Ver Carrito" :next="ROUTE_NAME.CART" v-if="cart.length" />
</template>
