<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount, ref } from "vue";
import { mdiCart } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
// Components
const OrderOffer = defineAsyncComponent(
  () => import("@/components/widgets/OrderOffer.vue")
);
const BaseIcon = defineAsyncComponent(
  () => import("@/components/BaseIcon.vue")
);
const NavTop = defineAsyncComponent(
  () => import("@/components/menu/NavTop.vue")
);
const NavBottom = defineAsyncComponent(
  () => import("@/components/menu/NavBottom.vue")
);
const CustomModal = defineAsyncComponent(
  () => import("@/components/menu/CustomModal.vue")
);

const $dataStore = useDataStore();
/**
 * ************************************
 *	Data
 * ************************************
 */

const modalOpen = ref(false);
const pedido = computed(() => $dataStore.pedido);
const pedidoCounter = computed(() => $dataStore.pedidoCounter);

const bebidas = computed(() => pedido.value.bebidas);
const complementos = computed(() => pedido.value.complementos);
const pizzas = computed(() => pedido.value.pizzas);
const promos = computed(() => pedido.value.promos);

/**
 * onEdit
 */
function onEdit() {
  console.log("onedit");
}
/**
 * onDelete
 * @param v
 */
function onDelete() {
  modalOpen.value = true;
}

function handleDelete() {
  closeModal();
}
/**
 * closeModal
 */
function closeModal() {
  modalOpen.value = false;
}

onBeforeMount(() => {
  scrollTo({ top: 0, behavior: "smooth" });
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
      <div class="mt-8 rounded-lg bg-slate-200 py-2 px-6" v-if="pedidoCounter">
        <div
          v-for="(promo, key) in promos"
          :key="`cart-promo-${key}`"
          class="mt-2 py-2"
        >
          <OrderOffer
            :cantidad="promo.cantidad"
            :offer="promo"
            type="promo"
            @delete="onDelete"
            @edit="onEdit"
            editable
          />

          <div
            class="mt-4 border border-slate-800"
            v-if="key < promos.length - 1"
          ></div>
        </div>
        <div
          v-for="(pizza, key) in pizzas"
          :key="`cart-pizza-${key}`"
          class="mt-2 py-2"
        >
          <OrderOffer
            :cantidad="pizza.cantidad"
            :offer="pizza"
            type="pizza"
            @delete="onDelete"
            @edit="onEdit"
            editable
          />

          <div
            class="mt-4 border border-slate-800"
            v-if="key < pizzas.length - 1"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <CustomModal v-model="modalOpen" name="delete-offer-modal">
    <h4 class="text-xl font-bold">Eliminar oferta</h4>
    <p class="my-4">Está seguro que desea eliminar la oferta?</p>
    <div class="modal-action">
      <button @click="closeModal" class="btn-sm btn">No</button>
      <button @click="handleDelete" class="btn-error btn-sm btn">
        Eliminar
      </button>
    </div>
  </CustomModal>

  <NavBottom label="Entrega" :next="ROUTE_NAME.CHECKOUT" v-if="pedidoCounter" />
</template>
