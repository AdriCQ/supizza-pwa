<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount } from "vue";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import { useRouter } from "vue-router";
import NavBottom from "@/components/menu/NavBottom.vue";
// Components
const HomeNav = defineAsyncComponent(
  () => import("@/components/menu/HomeNav.vue")
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

// Composables
const $router = useRouter();
const $store = useDataStore();

// Data
const complements = computed(() => $store.complements);
const drinks = computed(() => $store.drinks);
const pizzas = computed(() => $store.pizzas);
const promos = computed(() => $store.promos);

const searchData = computed(() => $store.search);
const isSearch = computed(() => $store.isSearch);

const pedido = computed(() => $store.pedido);
const countPedido = computed(
  () =>
    pedido.value.bebidas.length +
    pedido.value.complementos.length +
    pedido.value.pizzas.length +
    pedido.value.promos.length
);

const showNav = computed(
  () =>
    countPedido.value &&
    (complements.value.length ||
      drinks.value.length ||
      pizzas.value.length ||
      promos.value.length)
);

// Methods

/**
 * goToOffer
 * @param type
 * @param id
 */
function goToOffer(type: "pizza" | "promo", id: string) {
  if (type === "pizza")
    $router.push({
      name: ROUTE_NAME.PIZZA_DETAILS,
      params: {
        pizzaId: id,
      },
    });
  else if (type === "promo")
    $router.push({
      name: ROUTE_NAME.PROMO_DETAILS,
      params: {
        promoId: id,
      },
    });
}
onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <HomeNav />

  <div class="mt-2 space-y-2 px-6">
    <SearchForm />

    <!-- Mostrar resultados de la busqueda -->
    <template v-if="isSearch">
      <!-- Promos -->
      <section id="Promos-section" v-if="searchData.promos.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Promociones
        </h2>
        <div
          v-for="(promo, promoKey) in searchData.promos"
          :key="`search-promo-${promoKey}-${promo._id}`"
          class="cursor-pointer"
          @click="() => goToOffer('promo', promo._id)"
        >
          <PromoWidget :data="promo" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Promos -->

      <!-- Pizzas -->
      <section id="Pizzas-section" v-if="searchData.pizzas.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Pizzas
        </h2>
        <div
          v-for="(pizza, pizzaKey) in searchData.pizzas"
          :key="`searchData-pizza-${pizzaKey}-${pizza._id}`"
          class="cursor-pointer"
          @click="() => goToOffer('pizza', pizza._id)"
        >
          <PizzaWidget :data="pizza" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Pizzas -->

      <!-- Complementos -->
      <section id="Complementos-section" v-if="searchData.complementos.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Complementos
        </h2>
        <div
          v-for="(complement, complementKey) in searchData.complementos"
          :key="`searchData-complement-${complementKey}-${complement._id}`"
        >
          <ComplementWidget :data="complement" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Complementos -->

      <!-- Bebidas -->
      <section id="Bebidas-section" v-if="searchData.bebidas.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Bebidas
        </h2>
        <div
          v-for="(drink, drinkKey) in searchData.bebidas"
          :key="`searchData-drink-${drinkKey}-${drink._id}`"
        >
          <DrinkWidget :data="drink" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Complementos --></template
    >
    <!-- / Mostrar resultados de la busqueda -->

    <template v-else>
      <!-- Promos -->
      <section id="Promos-section" v-if="promos.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Promociones
        </h2>
        <div
          v-for="(promo, promoKey) in promos"
          :key="`promo-${promoKey}-${promo._id}`"
          class="cursor-pointer"
          @click="() => goToOffer('promo', promo._id)"
        >
          <PromoWidget :data="promo" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Promos -->

      <!-- Pizzas -->
      <section id="Pizzas-section" v-if="pizzas.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
          Pizzas
        </h2>
        <div
          v-for="(pizza, pizzaKey) in pizzas"
          :key="`pizza-${pizzaKey}-${pizza._id}`"
          class="cursor-pointer"
          @click="() => goToOffer('pizza', pizza._id)"
        >
          <PizzaWidget :data="pizza" />
          <div class="my-4 border border-slate-300"></div>
        </div>
      </section>
      <!-- / Pizzas -->

      <!-- Complementos -->
      <section id="Complementos-section" v-if="complements.length">
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
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
        <h2
          class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl"
        >
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
    </template>
  </div>

  <NavBottom label="Ver Carrito" :next="ROUTE_NAME.CART" v-if="showNav" />
</template>
