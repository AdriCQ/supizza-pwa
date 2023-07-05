<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setDefaultImage, toCurrency } from "@/helpers";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import type { Pizza, PizzaIngredient, PizzaSize } from "@/types";
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
const canComplete = ref(true);
const extraIngredients = computed<PizzaIngredient[]>(() => {
  const diff = $dataStore.pizzaIngredients.filter((ing) => {
    return !initialIngredients.value.find((initial) => initial._id === ing._id);
  });

  return diff;
});
const initialIngredients = ref<PizzaIngredient[]>([]);
const pizza = ref<Pizza>();
const qty = ref<number>(1);
const selectedTamano = ref<PizzaSize>();
const subtotal = computed(() => {
  if (pizza.value) {
    // precio inicial por tamano
    let price = selectedTamano.value?.precio as number;
    // Precio por ingredientes
    pizza.value.ingredientes.forEach((ing) => {
      price += ing.precio;
    });
    return price * qty.value;
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
  if (canComplete.value && pizza.value) {
    // Marcar un solo tamaño
    pizza.value.tamanos = [selectedTamano.value as PizzaSize];
    // Añadir al carrito
    $dataStore.addToPedido({
      cantidad: qty.value,
      offert: pizza.value,
      precio: subtotal.value,
      tipo: "pizza",
    });
    void $router.push({ name: ROUTE_NAME.HOME });
  }
}

/**
 * isSelectedIngredient
 * @param ingredientId
 */
function isSelectedIngredient(ingredientId: string) {
  if (pizza.value) {
    return (
      pizza.value.ingredientes.findIndex((i) => i._id === ingredientId) >= 0
    );
  }
  return false;
}

/**
 * toggleIngredient
 * @param ingredientId
 */
function toggleIngredient(ingredientId: string) {
  if (pizza.value) {
    // check if exists
    const index = pizza.value.ingredientes.findIndex(
      (i) => i._id === ingredientId
    );
    if (index >= 0) {
      pizza.value.ingredientes.splice(index, 1);
    } else {
      const ingredient = extraIngredients.value.find(
        (i) => i._id === ingredientId
      );
      pizza.value.ingredientes.push(ingredient as PizzaIngredient);
    }
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

  // obtener la pizza
  const pizzaId = $route.params.pizzaId;
  const pizzaIndex = $dataStore.pizzas.findIndex((p) => p._id == pizzaId);
  if (pizzaIndex >= 0) {
    pizza.value = $dataStore.pizzas[pizzaIndex];
    // Poner ingredientes incluidos en cero
    const ingredients = pizza.value.ingredientes.map((i) => ({
      ...i,
      precio: 0,
    }));
    pizza.value.ingredientes = ingredients;
    // Seleccionar tamano por defecto
    selectedTamano.value = pizza.value.tamanos[0];
    // Guardar Ingredientes incluidos
    initialIngredients.value = JSON.parse(
      JSON.stringify(ingredients)
    ) as PizzaIngredient[];
  }

  console.log({
    pizza: pizza.value,
  });
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.HOME }" />

  <div class="relative" v-if="pizza">
    <!-- Top mage -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="pizza?.urlImg.medium"
        :src="pizza?.urlImg.medium"
        @error="setDefaultImage"
        :alt="pizza.nombre"
        :title="pizza.nombre"
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
          {{ pizza.nombre }}
        </h1>
        <p v-if="pizza.descripcion">{{ pizza.descripcion }}</p>
      </div>

      <!-- Ingredientes -->
      <div class="rounded-md border bg-slate-200 p-4">
        <h3 class="text-center text-lg">Ingredientes Incluidos</h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <div
            v-for="(ingredient, ingredientKey) in initialIngredients"
            :key="`ingrediente-inl-${ingredientKey}`"
            class="rounded-full border bg-white px-2.5 py-1"
          >
            {{ ingredient.nombre }}
          </div>
        </div>
      </div>
      <!-- / Ingredientes -->
      <!-- Tamanos -->
      <div class="mt-4 rounded-md border bg-slate-200 p-4">
        <h3 class="text-center text-lg font-semibold">Tamaños</h3>

        <div
          class="mt-2"
          v-for="(tamano, tKey) in pizza.tamanos"
          :key="`tamano-${tKey}-${tamano._id}`"
        >
          <SimpleSelector
            class="my-4"
            :price="tamano.precio"
            :label="tamano.nombre"
            :selected="selectedTamano?._id === tamano._id"
            @click="selectedTamano = tamano"
          />
        </div>
      </div>
      <!-- / Tamanos -->

      <!-- Ingredientes Extras -->
      <div class="rounded-lg bg-slate-200 py-4 px-8">
        <h3 class="text-center text-lg font-semibold">Ingredientes Extra</h3>
        <div
          class="mt-2"
          v-for="(extra, extrakey) in extraIngredients"
          :key="`extra-${extrakey}-${extra._id}`"
        >
          <SimpleSelector
            class="my-4"
            :price="extra.precio"
            :label="extra.nombre"
            :selected="isSelectedIngredient(extra._id)"
            @click="() => toggleIngredient(extra._id)"
          />
        </div>
      </div>
      <!-- / Ingredientes Extras -->
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
