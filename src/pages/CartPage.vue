<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { mdiCart } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import type { CartOffer } from "@/types";
import { useDataStore } from "@/store";
// Components
import OrderOffer from "@/components/widgets/OrderOffer.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import NavTop from "@/components/menu/NavTop.vue";
import NavBottom from "@/components/menu/NavBottom.vue";
import CustomModal from "@/components/menu/CustomModal.vue";

const $dataStore = useDataStore();

const cart = computed(() => $dataStore.cart);
const modalOpen = ref(false);
const selected = ref<CartOffer>();
/**
 * onEdit
 */
function onEdit(v: CartOffer) {
  selected.value = v;
}
/**
 * onDelete
 * @param v
 */
function onDelete(v: CartOffer) {
  selected.value = v;
  modalOpen.value = true;
}

function handleDelete() {
  if (selected.value) $dataStore.removeFromCart(selected.value);
  closeModal();
}
/**
 * closeModal
 */
function closeModal() {
  selected.value = undefined;
  modalOpen.value = false;
}

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
  console.log({
    cart: cart.value,
  });
});
</script>

<template>
  <NavTop :back="{ name: ROUTE_NAME.HOME }" />

  <div class="min-h-screen py-2 px-4">
    <div class="mt-2">
      <h1 class="text-center text-3xl font-semibold">
        <BaseIcon
          :icon="mdiCart"
          size="2rem"
          class="inline-block stroke-slate-800"
        />
        Carrito
      </h1>
      <div
        class="mt-8 rounded-lg bg-slate-200 py-2 px-6"
        v-if="cart.offers.length"
      >
        <div
          v-for="(cartoffer, key) in cart.offers"
          :key="`cart-${key}`"
          class="py-2"
        >
          <OrderOffer
            :cart-offer="cartoffer"
            @delete="onDelete"
            @edit="onEdit"
            editable
          />
          <div
            class="mt-4 border border-slate-800"
            v-if="key < cart.offers.length - 1"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <CustomModal v-model="modalOpen" name="delete-offer-modal">
    <h4 class="text-xl font-bold">Eliminar del oferta</h4>
    <p class="my-4">Está seguro que desea eliminar la oferta?</p>
    <div class="modal-action">
      <button @click="closeModal" class="btn-sm btn">No</button>
      <button @click="handleDelete" class="btn-error btn-sm btn">
        Eliminar
      </button>
    </div>
  </CustomModal>

  <NavBottom
    label="Entrega"
    :next="ROUTE_NAME.CHECKOUT"
    v-if="cart.offers.length"
  />
</template>
