<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { LatLng, latLng } from "leaflet";
import { mdiCheck, mdiMapMarker } from "@mdi/js";
import { useMap } from "@/services";
import { useUserStore } from "@/store";
import type { Address, AddressCreate } from "@/types";
// Components
const BaseIcon = defineAsyncComponent(
  () => import("@/components/BaseIcon.vue")
);
const InputText = defineAsyncComponent(
  () => import("@/components/forms/InputText.vue")
);
const MapWidget = defineAsyncComponent(
  () => import("@/components/widgets/MapWidget.vue")
);

interface Emit {
  (e: "done", v: Address): void;
}

const $emit = defineEmits<Emit>();
const $mapService = useMap();
const $user = useUserStore();

const form = ref<AddressCreate>({
  calle: "",
  cliente: "",
  colonia: "",
  coordenadas: [],
  nombre: "",
  numero_ext: "",
  numero_int: "",
  referencia: "",
});
const mapZoom = ref(12);
const mapMarker = ref<LatLng>();
const mapCenter = ref<LatLng>(latLng(19.70078, -101.18443));
const showMap = ref<boolean>(false);
const userProfile = computed(() => $user.user);

/**
 * onSetMapMarker
 * @param marker
 */
function onSetMapMarker(marker: LatLng) {
  mapMarker.value = marker;
  form.value.coordenadas = [marker.lat, marker.lng];
  setTimeout(() => {
    showMap.value = false;
  }, 3000);
}

/**
 * onSubmit
 */
async function onSubmit() {
  if (form.value.coordenadas.length && userProfile.value) {
    form.value.cliente = userProfile.value?._id;

    try {
      const resp = await $mapService.createClientAddress(form.value);
      await $user.getAddress();
      console.log("Address Created", resp.data);
      $emit("done", resp.data);
    } catch (error) {
      console.log({ createAddress: error });
    }
  } else {
    console.log("Revise las coordenadas", form.value);
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="card text-center">
      <div class="card-body rounded-md bg-slate-200">
        <div
          role="button"
          class="btn-outline btn-primary btn w-full"
          @click="() => (showMap = true)"
        >
          <BaseIcon
            :icon="form.coordenadas.length ? mdiCheck : mdiMapMarker"
            size="1.2rem"
            class="mr-2"
          />
          Marcar en Mapa
        </div>

        <InputText
          v-model="form.nombre"
          label="Nombre"
          placeholder="Mi Casa"
          required
        />
        <InputText v-model="form.colonia" label="Colonia" required />
        <InputText
          v-model="form.calle"
          label="Calle"
          placeholder="Calle "
          required
        />
        <InputText
          v-model="form.numero_ext"
          label="Numero"
          placeholder="1234"
          required
        />
        <InputText
          v-model="form.referencia"
          label="Referencia"
          placeholder="La casa es azul"
          required
        />

        <button type="submit" class="btn-primary btn mt-4 w-full">
          Guardar
        </button>
      </div>
    </div>

    <!-- Map -->
    <div class="absolute top-0 left-0 z-10 h-screen w-screen" v-if="showMap">
      <MapWidget
        v-model:center="mapCenter"
        v-model:zoom="mapZoom"
        :marker="mapMarker"
        @update:marker="onSetMapMarker"
        class="z-0"
        style="height: 100vh !important"
      />
    </div>
    <!-- / Map -->
  </form>
</template>
