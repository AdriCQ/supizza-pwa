<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount, ref } from "vue";
import { mdiCart } from "@mdi/js";
import { ROUTE_NAME } from "@/router";
import { useDataStore } from "@/store";
import {
  PedidoBebida,
  PedidoComplemento,
  PedidoPizza,
  PedidoPromo,
} from "@/types";

interface ActionParam {
  type: "bebida" | "complemento" | "pizza" | "promo";
  offer: PedidoBebida | PedidoComplemento | PedidoPizza | PedidoPromo;
}

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
const selectedOffer = ref<ActionParam>();

const bebidas = computed(() => pedido.value.bebidas);
const complementos = computed(() => pedido.value.complementos);
const pizzas = computed(() => pedido.value.pizzas);
const promos = computed(() => pedido.value.promos);

/**
 * onEdit
 */
function onEdit(param: ActionParam) {
  console.log("onedit", { ...param });
}
/**
 * onDelete
 * @param v
 */
function onDelete(param: ActionParam) {
  selectedOffer.value = param;
  modalOpen.value = true;
}

function confirmDelete() {
  if (selectedOffer.value) {
    $dataStore.removeFromPedido({
      cantidad: selectedOffer.value?.offer.cantidad,
      offert: selectedOffer.value.offer,
      precio: selectedOffer.value.offer.precio,
      tipo: selectedOffer.value.type,
    });
  }
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

      <!-- Elementos del pedido -->
      <div class="mt-8 rounded-lg bg-slate-200 py-2 px-6" v-if="pedidoCounter">
        <!-- Promos -->

        <div
          class="border-t-slate-800 pt-2 text-center font-semibold"
          v-if="promos.length"
        >
          Promos
        </div>
        <div
          v-for="(promo, key) in promos"
          :key="`cart-promo-${key}`"
          class="mt-2 py-2"
        >
          <OrderOffer
            :cantidad="promo.cantidad"
            :offer="promo"
            type="promo"
            @delete="() => onDelete({ offer: promo, type: 'promo' })"
            @edit="() => onEdit({ offer: promo, type: 'promo' })"
            editable
          />

          <div
            class="mt-4 border border-slate-800"
            v-if="key < promos.length - 1"
          ></div>
        </div>
        <!-- / Promos -->

        <!-- Pizzas  -->
        <div
          class="border-t-slate-800 pt-4 text-center font-semibold"
          v-if="pizzas.length"
        >
          Pizzas
        </div>
        <div
          v-for="(pizza, key) in pizzas"
          :key="`cart-pizza-${key}`"
          class="py-2"
        >
          <OrderOffer
            :cantidad="pizza.cantidad"
            :offer="pizza"
            type="pizza"
            @delete="() => onDelete({ offer: pizza, type: 'pizza' })"
            @edit="() => onEdit({ offer: pizza, type: 'pizza' })"
            editable
          />
          <!-- / Promos -->

          <div
            class="mt-4 border border-slate-800"
            v-if="key < pizzas.length - 1"
          ></div>
        </div>
        <!-- /Pizzas  -->

        <!-- Complementos  -->
        <div
          class="border-t-slate-800 pt-4 text-center font-semibold"
          v-if="complementos.length"
        >
          Complementos
        </div>
        <div
          v-for="(complemento, key) in complementos"
          :key="`cart-complemento-${key}`"
          class="py-2"
        >
          <OrderOffer
            :cantidad="complemento.cantidad"
            :offer="complemento"
            type="complemento"
            @delete="
              () => onDelete({ offer: complemento, type: 'complemento' })
            "
            @edit="() => onEdit({ offer: complemento, type: 'complemento' })"
            editable
          />
          <!-- / Promos -->

          <div
            class="mt-4 border border-slate-800"
            v-if="key < complementos.length - 1"
          ></div>
        </div>

        <!-- BEbidas  -->
        <div
          class="border-t-slate-800 pt-4 text-center font-semibold"
          v-if="bebidas.length"
        >
          Bebidas
        </div>
        <div
          v-for="(bebida, key) in bebidas"
          :key="`cart-bebida-${key}`"
          class="py-2"
        >
          <OrderOffer
            :cantidad="bebida.cantidad"
            :offer="bebida"
            type="bebida"
            @delete="() => onDelete({ offer: bebida, type: 'bebida' })"
            @edit="() => onEdit({ offer: bebida, type: 'bebida' })"
            editable
          />
          <!-- / Promos -->

          <div
            class="mt-4 border border-slate-800"
            v-if="key < bebidas.length - 1"
          ></div>
        </div>
        <!-- /complementos  -->
      </div>
      <!-- / Elementos del pedido -->
    </div>
  </div>

  <CustomModal v-model="modalOpen" name="delete-offer-modal">
    <h4 class="text-xl font-bold">Eliminar oferta</h4>
    <p class="my-4">Está seguro que desea eliminar la oferta?</p>
    <div class="modal-action">
      <button @click="closeModal" class="btn-sm btn">No</button>
      <button @click="confirmDelete" class="btn-error btn-sm btn">
        Eliminar
      </button>
    </div>
  </CustomModal>

  <NavBottom label="Entrega" :next="ROUTE_NAME.CHECKOUT" v-if="pedidoCounter" />
</template>
