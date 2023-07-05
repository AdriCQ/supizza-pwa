<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setDefaultImage, toCurrency } from "@/helpers";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import type { Complement, Drink } from "@/types";
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
const offer = ref<Complement | Drink>();
const offerType = ref<"complemento" | "bebida">("bebida");
const qty = ref<number>(1);
const subtotal = computed(() => {
  if (offer.value) {
    const price = offer.value.precio;
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
  if (canComplete.value && offer.value) {
    // Añadir al carrito
    $dataStore.addToPedido({
      cantidad: qty.value,
      offert: offer.value,
      precio: subtotal.value,
      tipo: offerType.value,
    });
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

  // obtener la offer
  const offerId = $route.params.offerId;
  offerType.value = $route.query.type as "bebida" | "complemento";
  if (offerType.value === "bebida")
    offer.value = $dataStore.drinks.find((d) => d._id === offerId);
  else offer.value = $dataStore.complements.find((d) => d._id === offerId);
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.HOME }" />

  <div class="relative" v-if="offer">
    <!-- Top mage -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="offer?.urlImg.medium"
        :src="offer?.urlImg.medium"
        @error="setDefaultImage"
        :alt="offer.nombre"
        :title="offer.nombre"
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
          {{ offer.nombre }}
        </h1>

        <p v-if="(offer as Complement).descripcion">
          {{ (offer as Complement).descripcion }}
        </p>
      </div>
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
