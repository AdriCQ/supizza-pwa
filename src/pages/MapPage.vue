<script setup lang="ts">
import MapWidget from "@/components/widgets/MapWidget.vue";
import { latLng, LatLng } from "leaflet";
import { ref, onBeforeMount, watch } from "vue";
import type { IAddressCreate } from "@/types";
import InputText from "@/components/forms/InputText.vue";
import { useMap } from "@/helpers";

const { addressFromCoordinates, currentPosition } = useMap();

const form = ref<IAddressCreate>({
  address: "",
  exNum: 0,
  inNum: 0,
  lat: 0,
  lng: 0,
});

const mapZoom = ref(12);
const mapMarker = ref<LatLng>();
const mapCenter = ref<LatLng>(latLng(19.70078, -101.18443));

watch(mapMarker, (pos) => {
  handlePosition(pos);
});

/**
 * handlePosition
 * @param pos
 */
async function handlePosition(pos?: LatLng) {
  if (pos) {
    console.log({ pos });
  }
}

/**
 * vaildate
 */
function vaildate(): boolean {
  return true;
}

/**
 * onSubmit
 */
async function onSubmit() {
  console.log("onSubmit");
}

async function getLocation() {
  const resp = await currentPosition();
}

onBeforeMount(async () => {
  // Get Location
  await getLocation();
});
</script>

<template>
  <div class="relative min-h-screen">
    <MapWidget
      v-model:center="mapCenter"
      v-model:marker="mapMarker"
      v-model:zoom="mapZoom"
      class="z-0"
      style="height: 100vh !important"
    />

    <div class="absolute bottom-0 z-10 w-full px-4 py-2">
      <div class="m-2 bg-green-500 p-1 text-xs text-white" v-if="!mapMarker">
        Toca sobre la pantalla para seleccionar una dirección
      </div>
      <div class="card rounded-lg border-primary bg-white text-primary">
        <div class="p-4">
          <div class="font-bold">Datos para la entrega</div>
          <form @submit.prevent="onSubmit" class="space-y-1">
            <div class="flex gap-1">
              <InputText
                v-model="form.address"
                label="Direccion"
                placeholder="Direccion de entrega"
                class="w-full grow"
              />
              <InputText
                v-model="form.exNum"
                label="Num"
                class="w-20 flex-none"
              />
            </div>
            <InputText
              v-model="form.address"
              label="Referencia"
              placeholder="Referencia"
              subtitle="Agrega datos de ayuda que le permitan a nuestro repartidor entregar tu pedido"
            />

            <div class="mt-2">
              <button
                class="btn-primary btn w-full rounded-full text-white"
                type="submit"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
