<script setup lang="ts">
import type { IComplement, IDrink, IIngredient, IPizza, IPromo } from "@/types";
import ComplementWidget from "@/components/widgets/ComplementWidget.vue";
import DrinkWidget from "@/components/widgets/DrinkWidget.vue";
// import IngredientWidget from "@/components/widgets/IngredientWidget.vue";
import PizzaWidget from "@/components/widgets/PizzaWidget.vue";
import PromoWidget from "@/components/widgets/PromoWidget.vue";

defineProps<{
  type: "complement" | "drink" | "ingredient" | "pizza" | "promo";
  elements: IComplement[] | IDrink[] | IIngredient[] | IPizza[] | IPromo[];
}>();
</script>

<template>
  <div className="carousel rounded-box w-full gap-2">
    <div
      className="carousel-item w-1/2"
      v-for="(val, key) in elements"
      :key="`element-${type}-${key}`"
    >
      <ComplementWidget
        v-if="type === 'complement'"
        :complement="(val as IComplement)"
      />
      <DrinkWidget v-else-if="type === 'drink'" :drink="(val as IDrink)" />
      <PizzaWidget v-else-if="type === 'pizza'" :pizza="(val as IPizza)" />
      <PromoWidget v-else :promo="(val as IPromo)" />
    </div>
  </div>
</template>
