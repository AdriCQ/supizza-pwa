<script setup lang="ts">
import { onBeforeMount, ref, computed, watch } from "vue";
import type { Promo, Pizza, CartOffer, Complement, Drink } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import { setDefaultImage, toCurrency } from "@/helpers";
// Components
import NavTop from "@/components/menu/NavTop.vue";
import PromoDetails from "@/components/forms/PromoDetails.vue";
import PizzaDetails from "@/components/forms/PizzaDetails.vue";
import MultipleSelector from "@/components/forms/selectors/MultipleSelector.vue";
import { useDataStore } from "@/store";
type Offer = Complement | Drink | Pizza | Promo;

const $dataStore = useDataStore();
const $route = useRoute();
const $router = useRouter();

const fullData = computed(() => $dataStore.fullData);
const canComplete = ref(false);
const offer = ref<Offer>();
const cartOffer = ref<CartOffer>({
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

watch(fullData.value, (value, oldValue) => {
  console.log({
    value,
    oldValue,
  });
  initData();
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
function handleSetOffer(offer: CartOffer) {
  cartOffer.value = offer;
}

function initData() {
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
      (v: Offer) => v.id === id
    );
    offer.value = resp;
  } else if ($dataStore.selected) {
    offer.value = $dataStore.selected.value;
    cartOffer.value.type = $dataStore.selected.type;
  }
  cartOffer.value.offer = offer.value;
}
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  initData();
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
    <!-- Top mage -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="offer?.img"
        :src="offer.img"
        @error="setDefaultImage"
        :alt="(offer as Pizza).title ? (offer as Pizza).title : (offer as Complement).name"
        :title="(offer as Pizza).title ? (offer as Pizza).title : (offer as Complement).name"
        class="w-full"
      />
    </div>
    <!-- / Top mage -->

    <!-- Content -->
    <div
      class="min-h-[15rem] translate-y-96 space-y-4 rounded-t-3xl bg-white px-4 pb-36 pt-8"
    >
      <div class="text-center text-slate-700">
        <h1 class="text-2xl">
          {{
            (offer as Pizza).title
              ? (offer as Pizza).title
              : (offer as Complement).name
          }}
        </h1>
        <p v-if="(offer as Promo).desc">{{ (offer as Promo).desc }}</p>
      </div>

      <!-- Details -->
      <div class="mt-2">
        <PromoDetails
          v-if="cartOffer.type === 'promos'"
          :promo="(offer as Promo)"
          @can-complete="handleCanComplete"
          @set-offer="handleSetOffer"
        />
        <PizzaDetails
          v-if="cartOffer.type === 'pizzas'"
          :pizza="(offer as Pizza)"
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
