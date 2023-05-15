<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import type { OrderCreate } from "@/types";
import InputText from "./InputText.vue";
import { useDataStore, useUserStore } from "@/store";

const $cart = useDataStore();
const $router = useRouter();
const $user = useUserStore();

const form = ref<OrderCreate>({
  Direccion: {
    direccion: "",
    lat: 0,
    lng: 0,
  },
  Nombre: "",
  Productos: [],
  Telefono: "",
  TipoEntrega: "Encontrarse afuera",
  Pago: "Efectivo",
});

const user = computed(() => $user.user);
/**
 * onSubmit
 */
async function onSubmit() {
  console.log("onSubmit");
}

/**
 * authUser
 */
async function authUser() {
  try {
    await $user.login({
      telefono: form.value.Telefono,
    });
  } catch (error) {
    console.log({ loginError: error });
    try {
      await $user.register({
        apellidos: form.value.Telefono,
        nombres: form.value.Nombre,
        telefono: form.value.Telefono,
      });
    } catch (error) {
      console.log({ registerError: error });
    }
  }
}

onBeforeMount(() => {
  $user.load();
  if ($user.user) {
    form.value.Nombre = $user.user.nombres;
    form.value.Telefono = $user.user.telefono;
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
          v-model="form.Nombre"
          label="Nombre"
          requried
          type="text"
          placeholder="Pedro Navajas"
        /><InputText
          v-model="form.Telefono"
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
              <label>Envío a domicilio gratis después de $600.00</label>
              <input
                type="radio"
                name="tipo_entrega"
                class="radio-primary radio"
              />
            </div>
            <div class="flex items-center justify-between gap-2">
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
            </div>
          </div>
        </div>
        <!-- / Tipo Entrega -->

        <!-- Dirección de entrega -->
        <div class="card-body mt-4 rounded-md bg-slate-200">
          <h2 class="text-lg font-semibold">Dirección de entrega</h2>

          <button
            class="btn-primary btn w-full"
            @click="() => $router.push({ name: ROUTE_NAME.MAP_SELECTOR })"
          >
            Compartir mi Ubicación
          </button>
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
              />
            </div>
            <div class="flex items-center justify-between gap-2">
              <label>Pago con Tarjeta</label>
              <input
                type="radio"
                name="metodo_pago"
                class="radio-primary radio"
              />
            </div>
          </div>
        </div>
        <!-- /Tipo de Pago -->
      </template>
    </div>
  </form>
</template>
