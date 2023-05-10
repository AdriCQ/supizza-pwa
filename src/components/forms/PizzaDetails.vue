<script setup lang="ts">
import type { CartOffer, CartOfferAdditional, DataItem, Pizza } from "@/types";
import { ref, onBeforeMount } from "vue";
import IngredientSelector from "@/components/forms/selectors/IngredientSelector.vue";
import MultipleSelector from "@/components/forms/selectors/MultipleSelector.vue";
import SimpleSelector from "@/components/forms/selectors/SimpleSelector.vue";

const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: CartOffer): void;
}>();
const $props = defineProps<{ pizza: Pizza }>();

const cartOffer = ref<CartOffer>({
  qty: 1,
  type: "pizzas",
});

/**
 * handleOnReady
 * @param additionalIndex
 * @param ready
 */
function handleOnReady(additionalIndex: number, ready: boolean) {
  if (ready) {
    $emit("can-complete", true);
    $emit("set-offer", cartOffer.value);
  }
}
/**
 * handleSetAdditional
 * @param additionalIndex
 * @param value
 */
function handleSetAdditional(
  additionalIndex: number,
  value: CartOfferAdditional
) {
  if (cartOffer.value && cartOffer.value.additional) {
    cartOffer.value.additional[additionalIndex] = value;
    $emit("set-offer", cartOffer.value);
  }
}

function isSelected(
  additionalId: number | string,
  selectedId: string
): boolean {
  if (cartOffer.value.additional) {
    const additinalIndex = cartOffer.value.additional.findIndex(
      (a) => a.id == additionalId
    );
    if (additinalIndex >= 0) {
      const additional = cartOffer.value.additional[additinalIndex];
      return additional.selected.findIndex((s) => s.id === selectedId) >= 0;
    }
  }
  return false;
}
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  const additionals: DataItem[] = [];

  $props.pizza.additional.forEach((additional) => {
    additionals.push({
      desc: additional.desc,
      id: additional.id,
      name: additional.title,
      qty: 0,
      price: 0,
    });
  });
  cartOffer.value = {
    qty: 1,
    type: "pizzas",
    additional: [
      {
        id: "1",
        selected: [],
      },
    ],
    offer: $props.pizza,
  };
});
</script>

<template>
  <div class="space-y-2">
    <div
      class="rounded-md bg-slate-200 p-2 text-center"
      v-if="pizza.restrictions"
    >
      {{ pizza.restrictions }}
    </div>
    <div
      v-if="pizza.ingredients.length"
      class="mt-2 rounded-md bg-slate-200 px-2 py-4 text-center"
    >
      <div class="text-lg font-semibold">Ingredientes Incluidos</div>
      <div class="mt-4 flex flex-wrap justify-center gap-2">
        <div
          class="rounded-xl bg-slate-300 p-2"
          v-for="(ingredient, iKey) in pizza.ingredients"
          :key="`pizza-ingredient-${iKey}`"
        >
          {{ ingredient }}
        </div>
      </div>
    </div>

    <!-- Additions -->
    <IngredientSelector
      :additional="pizza.additional[0]"
      @ready="(ready) => handleOnReady(0, ready)"
      @set-additional="(a) => handleSetAdditional(0, a)"
    />

    <div
      v-for="(additional, additionalKey) in pizza.additional.slice(
        1,
        pizza.additional.length
      )"
      :key="`addtitional-${additionalKey}`"
      class="rounded-md bg-slate-200 p-2 text-center"
    >
      <div v-if="additional.type === 'radio'">
        <div class="text-lg font-semibold">
          {{ additional.desc }}
        </div>

        <SimpleSelector
          v-for="(item, itemKey) in additional.items"
          :key="`addtitional-${additionalKey}-item${itemKey}`"
          :label="item.name"
          :price="item.price"
          :selected="isSelected(additional.id, item.id)"
        />
      </div>
    </div>
    <!-- / Additions -->
  </div>
</template>
