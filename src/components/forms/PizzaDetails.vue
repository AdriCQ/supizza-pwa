<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import type {
  CartOffer,
  CartOfferAdditional,
  DataItem,
  NamePrice,
  Pizza,
} from "@/types";
import { DEFAULT_ADDITIONAL } from "@/helpers";
import IngredientSelector from "@/components/forms/selectors/IngredientSelector.vue";
// import MultipleSelector from "@/components/forms/selectors/MultipleSelector.vue";
import SimpleSelector from "@/components/forms/selectors/SimpleSelector.vue";
import PizzaSizeSelector from "./selectors/PizzaSizeSelector.vue";

const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: CartOffer): void;
}>();
const $props = defineProps<{ pizza: Pizza }>();

const cartOffer = ref<CartOffer>({
  qty: 1,
  type: "pizzas",
});

const includedIngredientsPrice = computed(() => {
  let ingredientPrice = 0;
  $props.pizza.ingredients.forEach(
    (ingredient) => (ingredientPrice += ingredient.price)
  );
  return ingredientPrice;
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

/**
 * handleOnSetSize
 * @param size
 */
function handleOnSetSize(size: NamePrice) {
  if (cartOffer.value.offer && cartOffer.value.additional) {
    cartOffer.value.additional[0] = {
      id: "additionalID",
      selected: [
        {
          desc: "Tamaño",
          id: "sizeId",
          name: size.name,
          price: 0,
          qty: 0,
        },
      ],
    };
    cartOffer.value.offer.price = size.price + includedIngredientsPrice.value;
  }
}

/**
 * isSelected
 * @param additionalId
 * @param selectedId
 * @returns boolean
 */
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
  const initialPrice = $props.pizza.sizes[0].price;

  const defaultSize = $props.pizza.sizes[0];

  cartOffer.value = {
    qty: 1,
    type: "pizzas",
    additional: [
      {
        id: "size",
        selected: [
          {
            desc: defaultSize.name,
            name: defaultSize.name,
            id: defaultSize.name,
            price: defaultSize.price,
            qty: 0,
          },
        ],
      },
    ],
    offer: { ...$props.pizza, price: initialPrice },
  };

  $emit("set-offer", cartOffer.value);

  handleOnSetSize(defaultSize);
});
</script>

<template>
  <div class="space-y-2">
    <!-- <div
      class="rounded-md bg-slate-200 p-2 text-center"
      v-if="pizza.restrictions"
    >
      {{ pizza.restrictions }}
    </div> -->
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
          {{ ingredient.name }}
        </div>
      </div>
    </div>

    <PizzaSizeSelector
      :sizes="pizza.sizes"
      :included-ingredients-price="includedIngredientsPrice"
      @set-size="handleOnSetSize"
    />

    <!-- Additions -->
    <IngredientSelector
      :additional="pizza.additional[DEFAULT_ADDITIONAL.INGREDIENT]"
      @ready="(ready) => handleOnReady(DEFAULT_ADDITIONAL.INGREDIENT, ready)"
      @set-additional="
        (a) => handleSetAdditional(DEFAULT_ADDITIONAL.INGREDIENT, a)
      "
    />

    <div
      v-for="(additional, additionalKey) in pizza.additional.slice(
        2,
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
