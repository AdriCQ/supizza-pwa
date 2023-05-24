<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import type { Address, OrderCreate } from "@/types";
import { useDataStore, useUserStore } from "@/store";
import { toCurrency } from "@/helpers";
import InputText from "./InputText.vue";
import { useService } from "@/services";

const $cart = useDataStore();
const $router = useRouter();
const $service = useService();
const $user = useUserStore();

const addressArray = computed<Address[]>(() => $user.address);

const form = ref<OrderCreate>({
  addressId: "",
  clientId: "",
  deliveryType: "Encontrarse afuera",
  orderOffers: [],
  paymentType: "Efectivo",
  totalPrice: 0,
});

const userForm = ref<{
  Telefono: string;
  Nombre: string;
}>({
  Nombre: "",
  Telefono: "",
});

const user = computed(() => $user.user);
/**
 * onSubmit
 */
async function onSubmit() {
  if ($user.user) {
    form.value.clientId = $user.user._id;
    form.value.orderOffers = $cart.cart.offers;
    form.value.totalPrice = $cart.cart.price;
    console.log({
      form: form.value,
    });
    try {
      const resp = await $service.orders.createOrder(form.value);
      console.log({ order: resp.data });
    } catch (error) {
      console.log({ orderError: error });
    }
  }
}

/**
 * authUser
 */
async function authUser() {
  try {
    await $user.login({
      telefono: userForm.value.Telefono,
    });
  } catch (error) {
    console.log({ loginError: error });
    try {
      await $user.register({
        apellidos: userForm.value.Telefono,
        nombres: userForm.value.Nombre,
        telefono: userForm.value.Telefono,
      });
      await $user.getAddress();
    } catch (error) {
      console.log({ registerError: error });
    }
  }
}

onBeforeMount(() => {
  if ($user.user) {
    userForm.value.Nombre = $user.user.nombres;
    userForm.value.Telefono = $user.user.telefono;
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="card p-2 text-center">
      <!-- Personal Data -->
      <div class="card-body rounded-md bg-slate-200">
        <h2 class="text-center text-lg font-semibold">
          {{ user ? "Datos Personales" : "Cree su usuario" }}
        </h2>
        <InputText
          v-model="userForm.Nombre"
          label="Nombre"
          requried
          type="text"
          placeholder="Pedro Navajas"
        /><InputText
          v-model="userForm.Telefono"
          label="Numero de Celular"
          requried
          type="tel"
          placeholder="00 00 00 00"
        />

        <div v-if="!user" @click="authUser" class="btn-primary btn mt-2">
          Iniciar
        </div>
      </div>
      <!-- / Personal Data -->

      <template v-if="user">
        <!-- Tipo Entrega -->
        <div class="card-body mt-4 rounded-md bg-slate-200">
          <h2 class="text-lg font-semibold">Tipo de Entrega</h2>
          <div class="space-y-2 text-justify">
            <div class="flex items-center justify-between gap-2">
              <label>Envío a domicilio gratis</label>
              <input
                type="radio"
                name="tipo_entrega"
                class="radio-primary radio"
                :checked="true"
              />
            </div>
            <!-- <div class="flex items-center justify-between gap-2">
              <label>Pasar a recoger</label>
              <input
                type="radio"
                name="tipo_entrega"
                class="radio-primary radio"
              />
            </div>
            <div class="flex items-center justify-between gap-2">
              <label>Comer en Restaurante</label>
              <input
                type="radio"
                name="tipo_entrega"
                class="radio-primary radio"
              />
            </div> -->
          </div>
        </div>
        <!-- / Tipo Entrega -->

        <!-- Dirección de entrega -->
        <div class="card-body mt-4 rounded-md bg-slate-200">
          <h2 class="text-lg font-semibold">Dirección de entrega</h2>
          <select class="select w-full max-w-xs" v-model="form.addressId">
            <option
              v-for="(address, addressKey) in addressArray"
              :key="`address-${addressKey}-${address._id}`"
              :value="address._id"
            >
              {{ address.nombre }}
            </option>
          </select>
          <p
            class="cursor-pointer text-sm text-primary"
            @click="
              () =>
                $router.push({
                  name: ROUTE_NAME.ADDRESS,
                })
            "
          >
            Administrar mis direcciones
          </p>
        </div>
        <!-- / Dirección de entrega -->

        <!-- Tipo de Pago -->
        <div class="card-body mt-4 rounded-md bg-slate-200">
          <h2 class="text-lg font-semibold">Método de Pago</h2>
          <div class="space-y-2 text-justify">
            <div class="flex items-center justify-between gap-2">
              <label>Pago en Efectivo</label>
              <input
                type="radio"
                name="metodo_pago"
                class="radio-primary radio"
                :checked="form.paymentType === 'Efectivo'"
                @click="() => (form.paymentType = 'Efectivo')"
              />
            </div>
            <div class="flex items-center justify-between gap-2">
              <label>Pago con Tarjeta</label>
              <input
                type="radio"
                name="metodo_pago"
                class="radio-primary radio"
                :checked="form.paymentType === 'Tarjeta'"
                @click="() => (form.paymentType = 'Tarjeta')"
              />
            </div>
          </div>
        </div>
        <!-- /Tipo de Pago -->
      </template>
    </div>

    <div class="p-2">
      <button type="submit" class="btn-primary btn w-full">
        {{ toCurrency($cart.cart.price) }} | Completar
      </button>
    </div>
  </form>
</template>
