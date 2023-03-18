<script setup lang="ts">
import NavTop from "@/components/menu/NavTop.vue";
import PromoDetails from "@/components/forms/PromoDetails.vue";
import PizzaDetails from "@/components/forms/PizzaDetails.vue";
import { useDataStore } from "@/store";
import { onBeforeMount, ref } from "vue";
import type { IPromo, IPizza, ICartOffer } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";

const $dataStore = useDataStore();
const $route = useRoute();
const $router = useRouter();

const canComplete = ref(false);
const offer = ref<IPizza | IPromo>();
const cartOffer = ref<ICartOffer>({
  offer: undefined,
  qty: 1,
  type: "complements",
});
/**
 * addToCart
 */
function addToCart() {
  if (canComplete.value) {
    $dataStore.addToCart(cartOffer.value);
    void $router.push({ name: ROUTE_NAME.HOME });
  }
}
/**
 * handleCanComplete
 * @param complete
 */
function handleCanComplete(complete: boolean) {
  canComplete.value = complete;
}
/**
 * handleSetOffer
 * @param offer
 */
function handleSetOffer(offer: ICartOffer) {
  cartOffer.value = offer;
}

onBeforeMount(() => {
  // Load data from route
  if ($route.query.type && $route.query.id) {
    const type = $route.query.type;
    const id = Number($route.query.id);
    if (type === "promos" || type === "pizzas") cartOffer.value.type = type;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = ($dataStore[type] as IPizza[] | IPromo[]).find(
      (v: IPromo | IPizza) => v.id === id
    );
    offer.value = resp;
  } else if ($dataStore.selected) {
    offer.value = $dataStore.selected.value;
    cartOffer.value.type = $dataStore.selected.type;
  }
  cartOffer.value.offer = offer.value;

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <NavTop back="back" />

  <div class="relative" v-if="offer">
    <!-- Top Image -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="offer?.img"
        :src="offer.img"
        :alt="offer.title"
        :title="offer.title"
        class="w-full"
      />
    </div>
    <!-- / Top Image -->

    <!-- Content -->
    <div
      class="min-h-[15rem] translate-y-96 space-y-4 rounded-t-3xl bg-white px-4 pb-24 pt-8"
    >
      <div class="flex gap-2 text-primary">
        <div class="flex-1">
          <h1 class="text-2xl">{{ offer?.title }}</h1>
        </div>

        <div class="flex-none text-lg font-bold">
          ${{ Number(offer?.price).toFixed(2) }}
        </div>
      </div>

      <!-- Details -->
      <div class="mt-2">
        <PromoDetails
          v-if="cartOffer.type === 'promos'"
          :promo="(offer as IPromo)"
          @can-complete="handleCanComplete"
          @set-offer="handleSetOffer"
        />
        <PizzaDetails
          v-if="cartOffer.type === 'pizzas'"
          :pizza="(offer as IPizza)"
          @can-complete="handleCanComplete"
          @set-offer="handleSetOffer"
        />
      </div>
      <!-- / Details -->
    </div>
    <!-- / Content -->

    <div class="fixed bottom-0 w-full bg-white px-6 pb-4">
      <div
        class="btn-primary btn w-full"
        :class="{ 'btn-disabled': !canComplete }"
        @click="addToCart"
      >
        Añadir
      </div>
    </div>
  </div>
</template>
