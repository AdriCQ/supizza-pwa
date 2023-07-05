<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import { toCurrency } from "@/helpers";
import { useService } from "@/services";
import { useAppStore, useDataStore, useUserStore } from "@/store";
import type { Address, PedidoCreate } from "@/types";

const InputText = defineAsyncComponent(() => import("./InputText.vue"));

/**
 * ************************************
 *	Composables
 * ************************************
 */

const $app = useAppStore();
const $dataStore = useDataStore();
const $router = useRouter();
const $service = useService();
const $user = useUserStore();
/**
 * ************************************
 *	Data
 * ************************************
 */

const addressList = computed<Address[]>(() => $user.addressList);

const form = ref<PedidoCreate>({
  bebidas: [],
  cliente: "",
  complementos: [],
  direccion: "",
  entrega: "Domicilio",
  forma_pago: "Efectivo",
  nota: "",
  pizzas: [],
  promos: [],
  sucursal: "Domicilio",
  tipo: "Panel",
  total: 0,
  pagado: false,
  status: "Pendiente",
});

const pedidoPrecio = computed(() => $dataStore.pedidoPrecio);

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
    form.value.cliente = $user.user._id;
    form.value.bebidas = $dataStore.pedido.bebidas;
    form.value.complementos = $dataStore.pedido.complementos;
    form.value.pizzas = $dataStore.pedido.pizzas;
    form.value.promos = $dataStore.pedido.promos;
    form.value.total = $dataStore.pedidoPrecio;

    try {
      await $service.orders.createOrder(form.value);
      $app.success("Ya recibimos su pedido");
      // Reiniciar pedido
      $dataStore.pedido = {
        bebidas: [],
        cliente: "",
        complementos: [],
        direccion: "",
        entrega: "",
        forma_pago: "Efectivo",
        nota: "",
        pizzas: [],
        promos: [],
        sucursal: "",
        tipo: "Panel",
        total: 0,
        pagado: false,
        status: "Pendiente",
      };
      $dataStore.clearStorage();
      // Redirigir a vista principal
      $router.push({
        name: ROUTE_NAME.HOME,
      });
    } catch (error) {
      $app.axiosError(error);
    }
  }
}

/**
 * authUser
 */
async function authUser() {
  try {
    // Register first
    await $user.register({
      apellidos: userForm.value.Telefono,
      nombres: userForm.value.Nombre,
      telefono: userForm.value.Telefono,
    });
  } catch (registerError) {
    // If user already registered then login
    console.log({
      registerError,
    });
    try {
      await $user.login({
        telefono: userForm.value.Telefono,
      });
    } catch (loginError) {
      console.log({ loginError });
    }
  }

  if ($user.user) {
    await $user.getAddress();
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
          <select class="select w-full max-w-xs" v-model="form.direccion">
            <option
              v-for="(address, addressKey) in addressList"
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
                :checked="form.forma_pago === 'Efectivo'"
                @click="() => (form.forma_pago = 'Efectivo')"
              />
            </div>
            <div class="flex items-center justify-between gap-2">
              <label>Pago con Tarjeta</label>
              <input
                type="radio"
                name="metodo_pago"
                class="radio-primary radio"
                :checked="form.forma_pago === 'Tarjeta'"
                @click="() => (form.forma_pago = 'Tarjeta')"
              />
            </div>
          </div>
        </div>
        <!-- /Tipo de Pago -->
      </template>
    </div>

    <div class="p-2" v-if="user">
      <button type="submit" class="btn-primary btn w-full">
        {{ toCurrency(pedidoPrecio) }} | Completar
      </button>
    </div>
  </form>
</template>
