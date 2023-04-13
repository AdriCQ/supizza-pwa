<script setup lang="ts">
import NavTop from "@/components/menu/NavTop.vue";
import PromoDetails from "@/components/forms/PromoDetails.vue";
import PizzaDetails from "@/components/forms/PizzaDetails.vue";
import MultipleSelector from "@/components/forms/selectors/MultipleSelector.vue";
import { useDataStore } from "@/store";
import { onBeforeMount, ref, computed } from "vue";
import type { IPromo, IPizza, ICartOffer, IComplement, IDrink } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import { toCurrency } from "@/helpers";

type IOffer = IComplement | IDrink | IPizza | IPromo;

const $dataStore = useDataStore();
const $route = useRoute();
const $router = useRouter();

const canComplete = ref(false);
const offer = ref<IOffer>();
const cartOffer = ref<ICartOffer>({
  offer: undefined,
  qty: 1,
  type: "complements",
});
const subtotal = computed(() => {
  let ret = cartOffer.value.offer?.price ?? 0;
  // handle additional price
  if (cartOffer.value.additional) {
    cartOffer.value.additional.forEach((additional) => {
      if (additional.selected && additional.selected.length) {
        additional.selected.forEach((sel) => {
          ret += sel.price * sel.qty;
        });
      }
    });
  }
  return ret * cartOffer.value.qty;
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
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  // Load data from route
  if ($route.query.type && $route.query.id) {
    const type = $route.query.type;
    const id = String($route.query.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cartOffer.value.type = type;
    if (
      cartOffer.value.type === "drinks" ||
      cartOffer.value.type === "complements"
    )
      canComplete.value = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = $dataStore[cartOffer.value.type].find(
      (v: IOffer) => v.id === id
    );
    offer.value = resp;
  } else if ($dataStore.selected) {
    offer.value = $dataStore.selected.value;
    cartOffer.value.type = $dataStore.selected.type;
  }
  cartOffer.value.offer = offer.value;

  console.log({ offer: offer.value, cartOffer: cartOffer.value });

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
        :alt="(offer as IPizza).title ? (offer as IPizza).title : (offer as IComplement).name"
        :title="(offer as IPizza).title ? (offer as IPizza).title : (offer as IComplement).name"
        class="w-full"
      />
    </div>
    <!-- / Top Image -->

    <!-- Content -->
    <div
      class="min-h-[15rem] translate-y-96 space-y-4 rounded-t-3xl bg-white px-4 pb-36 pt-8"
    >
      <div class="text-center text-slate-700">
        <h1 class="text-2xl">
          {{
            (offer as IPizza).title
              ? (offer as IPizza).title
              : (offer as IComplement).name
          }}
        </h1>
        <p v-if="(offer as IPromo).desc">{{ (offer as IPromo).desc }}</p>
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

    <div class="fixed bottom-0 w-full bg-white p-4">
      <div class="bg-slate-200 py-4 px-10">
        <div class="flex items-center">
          <div class="flex-1">Cantidad</div>
          <div class="flex-none cursor-pointer">
            <MultipleSelector v-model="cartOffer.qty" can-add />
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
