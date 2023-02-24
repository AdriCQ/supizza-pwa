<script setup lang="ts">
import type { ICartOffer, ICartOfferAdditional, IPizza } from "@/types";
import { ref, onBeforeMount } from "vue";
import IngredientSelector from "@/components/forms/selectors/IngredientSelector.vue";

const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: ICartOffer): void;
}>();
const $props = defineProps<{ pizza: IPizza }>();

const cartOffer = ref<ICartOffer>({
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
  value: ICartOfferAdditional
) {
  if (cartOffer.value && cartOffer.value.additional) {
    cartOffer.value.additional[additionalIndex] = value;
    $emit("set-offer", cartOffer.value);
  }
}
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  cartOffer.value = {
    qty: 1,
    type: "pizzas",
    additional: [
      {
        id: 1,
        selected: [],
      },
    ],
    offer: $props.pizza,
  };
});
</script>

<template>
  <div class="space-y-2">
    <div class="rounded-sm bg-red-200 p-2">{{ pizza.restrictions }}</div>

    <!-- Additions -->
    <IngredientSelector
      :additional="pizza.additional[0]"
      @ready="(ready) => handleOnReady(0, ready)"
      @set-additional="(a) => handleSetAdditional(0, a)"
    />
    <!-- / Additions -->
  </div>
</template>
