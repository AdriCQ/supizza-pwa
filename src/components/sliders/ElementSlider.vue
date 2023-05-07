<script setup lang="ts">
import type {
  Drink,
  Pizza,
  Promo,
  ResponseDataKey,
  SelectedDetails,
} from "@/types";
import { useDataStore } from "@/store";
import OfferWidget from "@/components/widgets/OfferWidget.vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import { computed } from "vue";

const $props = defineProps<{
  type: ResponseDataKey;
  elements: Drink[] | Pizza[] | Promo[];
  link?: boolean;
}>();
const $dataStore = useDataStore();
const $router = useRouter();
/**
 * title
 */
const title = computed(() => {
  switch ($props.type) {
    case "complements":
      return "Complementos";
    case "drinks":
      return "Bebidas";
    case "ingredients":
      return "ngredientes";
    case "pizzas":
      return "Pizzas";
    case "promos":
      return "Promociones";
    default:
      return "";
  }
});

/**
 * selectElement
 * @param sel
 */
function selectElement(sel: SelectedDetails) {
  $dataStore.selected = sel;
  if ($props.link && ($props.type === "pizzas" || $props.type === "promos")) {
    $router.push({
      name: ROUTE_NAME.OFFER_DETAILS,
      query: { type: $props.type, id: sel.value.id },
    });
  }
}
</script>

<template>
  <h3 class="text-xl">
    {{ title }}
  </h3>
  <div className="carousel rounded-box w-full gap-2">
    <div
      className="carousel-item w-1/2"
      v-for="(value, key) in elements"
      :key="`element-${type}-${key}`"
    >
      <OfferWidget
        :pizza="type === 'pizzas' ? value as Pizza : undefined"
        :drink="type === 'drinks' ? value as Drink : undefined"
        :promo="type === 'promos' ? value as Promo : undefined"
        @click="selectElement({ type, value: value as Promo | Pizza })"
      />
    </div>
  </div>
</template>
