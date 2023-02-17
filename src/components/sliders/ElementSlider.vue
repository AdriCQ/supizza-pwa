<script setup lang="ts">
import type {
  IComplement,
  IDrink,
  IIngredient,
  IPizza,
  IPromo,
  IResponseDataKey,
  ISelectedDetails,
} from "@/types";
import { useDataStore } from "@/helpers/pinia";
import ComplementWidget from "@/components/widgets/ComplementWidget.vue";
import DrinkWidget from "@/components/widgets/DrinkWidget.vue";
// import IngredientWidget from "@/components/widgets/IngredientWidget.vue";
import PizzaWidget from "@/components/widgets/PizzaWidget.vue";
import PromoWidget from "@/components/widgets/PromoWidget.vue";
import { useRouter } from "vue-router";
import { ROUTE_NAME } from "@/router";

const $props = defineProps<{
  type: IResponseDataKey;
  elements: IComplement[] | IDrink[] | IIngredient[] | IPizza[] | IPromo[];
  link?: boolean;
}>();
const $dataStore = useDataStore();
const $router = useRouter();

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
  <div className="carousel rounded-box w-full gap-2">
    <div
      className="carousel-item w-1/2"
      v-for="(value, key) in elements"
      :key="`element-${type}-${key}`"
    >
      <ComplementWidget
        v-if="type === 'complements'"
        :complement="(value as IComplement)"
      />
      <DrinkWidget v-else-if="type === 'drinks'" :drink="(value as IDrink)" />
      <PizzaWidget
        @click="selectElement({ type, value: value as IPizza })"
        v-else-if="type === 'pizzas'"
        :pizza="(value as IPizza)"
      />
      <PromoWidget
        @click="selectElement({ type, value: value as IPromo })"
        v-else
        :promo="(value as IPromo)"
      />
    </div>
  </div>
</template>
