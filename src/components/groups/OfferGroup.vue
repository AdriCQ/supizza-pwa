<script setup lang="ts">
import type {
  IComplement,
  IDrink,
  IPizza,
  IPromo,
  IResponseDataKey,
  ISelectedDetails,
} from "@/types";
import { useDataStore } from "@/store";
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
  // if ($props.link && ($props.type === "pizzas" || $props.type === "promos")) {
  $router.push({
    name: ROUTE_NAME.OFFER_DETAILS,
    query: { type: $props.type, id: sel.value.id },
  });
  // }
}
</script>

<template>
  <div>
    <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
      {{ title }}
    </h2>
    <div v-for="(value, key) in elements" :key="`element-${type}-${key}`">
      <div
        class="p-2"
        @click="()=>selectElement({ type, value: value as IPromo | IPizza })"
      >
        <OfferWidget
          :pizza="type === 'pizzas' ? value as IPizza : undefined"
          :drink="type === 'drinks' ? value as IDrink : undefined"
          :promo="type === 'promos' ? value as IPromo : undefined"
          :complement="type === 'complements' ? value as IComplement : undefined"
        />
      </div>
      <div class="hr my-4"></div>
    </div>
  </div>
</template>

<style scoped>
.hr {
  border: solid 1px rgba(0, 0, 0, 0.3);
}
</style>
