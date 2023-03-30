<script setup lang="ts">
import { ROUTE_NAME } from "@/router";
import type { IOrderCreate } from "@/types";
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputText from "./InputText.vue";

const $router = useRouter();

const form = ref<IOrderCreate>({
  Direccion: {
    direccion: "",
    lat: 0,
    lng: 0,
  },
  Nombre: "",
  Productos: [],
  Telefono: "",
  TipoEntrega: "Encontrarse afuera",
});
/**
 * onSubmit
 */
async function onSubmit() {
  console.log("onSubmit");
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="card p-2 text-center">
      <!-- Personal Data -->
      <div class="card-body rounded-md bg-slate-200">
        <h2 class="text-center text-lg font-semibold">Datos Personales</h2>
        <InputText
          v-model="form.Nombre"
          label="Nombre"
          requried
          type="text"
          placeholder="Pedro Navajas"
        /><InputText
          v-model="form.Nombre"
          label="Numero de Celular"
          requried
          type="tel"
          placeholder="00 00 00 00"
        />
      </div>
      <!-- / Personal Data -->

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

        <p>El servicio a domicilio es exclusivo para las siguientes colonias</p>

        <select class="select w-full">
          <option value="">Region 1</option>
          <option value="">Region 2</option>
          <option value="">Region 3</option>
          <option value="">Region 4</option>
        </select>
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
    </div>
  </form>
</template>
