<script setup lang="ts">
import type {
  IDrink,
  IPizza,
  IPromo,
  IResponseDataKey,
  ISelectedDetails,
} from "@/types";
import { useDataStore } from "@/helpers/pinia";
import OfferWidget from "@/components/widgets/OfferWidget.vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";
import { computed } from "vue";

const $props = defineProps<{
  type: IResponseDataKey;
  elements: IDrink[] | IPizza[] | IPromo[];
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
      return "Ingredientes";
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
function selectElement(sel: ISelectedDetails) {
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
        :pizza="type === 'pizzas' ? value as IPizza : undefined"
        :drink="type === 'drinks' ? value as IDrink : undefined"
        :promo="type === 'promos' ? value as IPromo : undefined"
        @click="selectElement({ type, value: value as IPromo | IPizza })"
      />
    </div>
  </div>
</template>
