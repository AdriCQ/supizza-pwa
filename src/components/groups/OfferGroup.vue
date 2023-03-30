<script setup lang="ts">
import type {
  IComplement,
  IDrink,
  IPizza,
  IPromo,
  IResponseDataKey,
} from "@/types";
import OfferWidget from "@/components/widgets/OfferWidget.vue";
import { computed } from "vue";

const $props = defineProps<{
  type: IResponseDataKey;
  elements: IDrink[] | IPizza[] | IPromo[];
  link?: boolean;
}>();
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
</script>

<template>
  <div>
    <h2 class="border border-x-0 border-t-0 border-b-slate-500 py-4 text-2xl">
      {{ title }}
    </h2>
    <div v-for="(value, key) in elements" :key="`element-${type}-${key}`">
      <div class="p-2">
        <OfferWidget
          :link="link"
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
