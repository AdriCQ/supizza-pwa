<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setDefaultImage, toCurrency } from "@/helpers";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import type { Complement, Drink, Pizza, Promo } from "@/types";
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
interface Limit {
  min: number;
  max: number;
}
// Components
const NavTop = defineAsyncComponent(
  () => import("@/components/menu/NavTop.vue")
);
const MultipleSelector = defineAsyncComponent(
  () => import("@/components/forms/selectors/MultipleSelector.vue")
);
const SimpleSelector = defineAsyncComponent(
  () => import("@/components/forms/selectors/SimpleSelector.vue")
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
const canComplete = computed(() => {
  if (promo.value) {
    let pizzaQty = 0;
    let drinkQty = 0;
    let complementQty = 0;

    qtySelector.value.complement.forEach((i) => (complementQty += i));
    qtySelector.value.drink.forEach((i) => (drinkQty += i));
    qtySelector.value.pizza.forEach((i) => (pizzaQty += i));

    // validar cantidad de pizza
    if (
      pizzaQty > promo.value.limites.maxPizza ||
      pizzaQty < promo.value.limites.minPizza
    )
      return false;

    // validar cantidad de complementos
    if (
      complementQty > promo.value.limites.maxComplemento ||
      complementQty < promo.value.limites.minComplemento
    )
      return false;

    // // validar cantidad de bebidas
    if (
      drinkQty > promo.value.limites.maxBebida ||
      drinkQty < promo.value.limites.minBebida
    )
      return false;

    return true;
  }
  return false;
});
// complementos incluidas en la promo
const complementsAvailable = computed(() => promo.value?.complementos);
const complementQty = computed(() => {
  let qty = 0;
  qtySelector.value.complement.forEach((c) => (qty += c));
  return qty;
});
// bebidas incluidas en la promo
const drinksAvailable = computed(() => promo.value?.bebidas);
const drinkQty = computed(() => {
  let qty = 0;
  qtySelector.value.drink.forEach((c) => (qty += c));
  return qty;
});
// pizzas incluidas en la promo
const pizzasAvailable = computed(() => promo.value?.pizzas);
const pizzaQty = computed(() => {
  let qty = 0;
  qtySelector.value.pizza.forEach((c) => (qty += c));
  return qty;
});
const promo = ref<Promo>();
// cantidad de promos
const qty = ref<number>(1);
// almacena las cantidades
const qtySelector = ref<QtySelector>({
  complement: [],
  drink: [],
  pizza: [],
});
// subtotal
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
  if (canComplete.value && promo.value) {
    // Actualizar las pizzas seleccionadas
    const pizzasInPromo: Pizza[] = [];
    const bebidaInPromo: Drink[] = [];
    const complementoInPromo: Complement[] = [];

    // Obtener pizzas seleccionadas
    qtySelector.value.pizza.forEach((qty, index) => {
      const currentPizza = promo.value?.pizzas[index];
      if (currentPizza) {
        for (let qtyIterator = 0; qtyIterator < qty; qtyIterator++) {
          pizzasInPromo.push(currentPizza);
        }
      }
    });

    // Obtener bebidas seleccionadas
    qtySelector.value.drink.forEach((qty, index) => {
      const current = promo.value?.bebidas[index];
      if (current && qty > 0) {
        bebidaInPromo.push(current);
      }
    });

    // Obtener complementos seleccionados
    qtySelector.value.complement.forEach((qty, index) => {
      const current = promo.value?.complementos[index];
      if (current && qty > 0) {
        complementoInPromo.push(current);
      }
    });

    // asignar a la promo
    promo.value.pizzas = pizzasInPromo;
    promo.value.bebidas = bebidaInPromo;
    promo.value.complementos = complementoInPromo;

    // Almacenar el pedido
    $dataStore.addToPedido({
      cantidad: qty.value,
      offert: promo.value,
      precio: subtotal.value,
      tipo: "promo",
    });
    void $router.push({ name: ROUTE_NAME.HOME });
  }
}
/**
 * verifica si se puede añadir
 * @param type
 */
function canAdd(
  type: "complement" | "drink" | "pizza",
  index: number
): boolean {
  if (promo.value) {
    let limit: Limit;
    switch (type) {
      case "complement":
        // obtener limites de commplemento
        limit = {
          max: promo.value.limites.maxComplemento,
          min: promo.value.limites.minComplemento,
        };
        // obtenr cantidad actual
        return (
          !isNaN(complementQty.value) && limit.max >= complementQty.value + 1
        );
      case "drink":
        // obtener limites de drink
        limit = {
          max: promo.value.limites.maxBebida,
          min: promo.value.limites.minBebida,
        };
        // obtenr cantidad actual
        return !isNaN(drinkQty.value) && limit.max >= drinkQty.value + 1;
      case "pizza":
        // obtener limites de pizza
        limit = {
          max: promo.value.limites.maxPizza,
          min: promo.value.limites.minPizza,
        };
        return pizzaQty.value < limit.max;
      default:
        return false;
    }
  }
  return false;
}

/**
 * toggleSelect
 * @param type
 * @param index
 */
function toggleSelect(type: "complement" | "drink" | "pizza", index: number) {
  if (qtySelector.value[type][index]) {
    qtySelector.value[type][index] = 0;
  } else if (canAdd(type, index)) {
    qtySelector.value[type][index] = 1;
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
                :can-add="canAdd('pizza', pizzaIndex)"
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
          :key="`drink-available-${drink._id}-${drinkIndex}`"
        >
          <SimpleSelector
            :label="drink.nombre"
            :selected="Boolean(qtySelector.drink[drinkIndex])"
            @click="() => toggleSelect('drink', drinkIndex)"
          />
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
          :key="`complement-available-${complement._id}-${complementIndex}`"
        >
          <SimpleSelector
            :label="complement.nombre"
            :selected="Boolean(qtySelector.complement[complementIndex])"
            class="mt-2"
            @click="() => toggleSelect('complement', complementIndex)"
          />
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
