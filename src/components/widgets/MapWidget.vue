<template>
  <l-map
    ref="map"
    id="map--pageleaflet"
    class="h-full w-full"
    :zoom="Number(zoom)"
    :center="center"
    :min-zoom="settings.zoom.min"
    :max-zoom="settings.zoom.max"
    @click="addMarker"
    @update:center="doMoveCenter"
    @update:zoom="doMoveZoom"
    :key="`map-key-${zoom}-${center.lat}-${center.lng}`"
  >
    <l-tile-layer :url="MAP_URL" :attribution="ATTRIBUTION" />

    <l-marker :lat-lng="marker" v-if="marker" />
  </l-map>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import type { LatLng, LocationEvent } from "leaflet";
import {
  // LControl,
  LMap,
  LMarker,
  LTileLayer,
} from "@vue-leaflet/vue-leaflet";
import { toRefs } from "vue";
/**
 * ATTRIBUTION
 */
const ATTRIBUTION =
  '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
/**
 * MAP_URL
 */
const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const settings = {
  multiple: false,
  zoom: {
    max: 18,
    min: 4,
  },
};

const $emit = defineEmits<{
  (e: "update:marker", p: LatLng): void;
  (e: "update:center", p: LatLng): void;
  (e: "update:zoom", p: number): void;
}>();

const $props = defineProps<{
  marker?: LatLng;
  center: LatLng;
  zoom: number;
  readonly?: boolean;
}>();

const { marker, center, zoom, readonly } = toRefs($props);

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

/**
 * addMarker
 */
function addMarker(event: MouseEvent | PointerEvent | LocationEvent) {
  if ($props.readonly) return;
  if ((event as LocationEvent).latlng) {
    $emit("update:marker", (event as LocationEvent).latlng);
  }
}

/**
 * doMoveCenter
 * @param _center
 */
function doMoveCenter(_center: LatLng) {
  $emit("update:center", _center);
}
/**
 * doMoveZoom
 * @param _zoom
 */
function doMoveZoom(_zoom: number) {
  $emit("update:zoom", _zoom);
}
</script>
