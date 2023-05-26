<script setup lang="ts">
import type { CartOffer, CartOfferAdditional, Promo } from "@/types";
import { ref, onBeforeMount } from "vue";
import MultipleSelector from "./selectors/MultipleSelector.vue";
// import SimpleSelector from "./selectors/SimpleSelector.vue";

interface Qty {
  additional: string;
  item: string;
  qty: number;
}

interface CanAdd {
  additional: string;
  can: boolean;
}

const $props = defineProps<{
  promo: Promo;
}>();
const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: CartOffer): void;
}>();

// Qty
const qty = ref<Qty[]>([]);
const cartOffer = ref<CartOffer>({
  qty: 1,
  type: "promos",
});
// Can Add
const canAdd = ref<CanAdd[]>([]);
/**
 * countItems
 * @param additionalId
 */
function countItems(additionalId: number | string) {
  let counter = 0;
  qty.value.forEach((q) => {
    if (q.additional === additionalId) {
      counter += q.qty;
    }
  });
  return counter;
}
/**
 * canCompleteOperation
 */
function canCompleteOperation() {
  const canComplete: boolean[] = [];
  // Each additional
  $props.promo.additional.forEach((additional, aKey) => {
    canComplete.push(false);
    const itemCounter = countItems(additional.id);
    // is multiple?
    if (additional.type === "multiple") {
      // complete condition
      if (itemCounter <= additional.max && itemCounter >= additional.min)
        canComplete[aKey] = true;
      else canComplete[aKey] = false;
      // can o can't add
      const canAddIndex = canAdd.value.findIndex(
        (c) => c.additional === additional.id
      );
      if (canAddIndex >= 0) {
        if (itemCounter === additional.max)
          canAdd.value[canAddIndex].can = false;
        else if (itemCounter < additional.max)
          canAdd.value[canAddIndex].can = true;
      } else {
        console.log("error canAddIndex");
      }
    }
  });

  let finalComplete = true;
  canComplete.forEach((v) => {
    if (!v) finalComplete = false;
  });
  $emit("can-complete", finalComplete);
}
/**
 * getQty
 * @param additionalId
 * @param itemId
 */
function getQty(additionalId: string, itemId: string) {
  const value = qty.value.find(
    (q) => q.item === itemId && q.additional === additionalId
  );
  return value ? value.qty : 0;
}
/**
 * setQty
 * @param additionalKey
 * @param itemKey
 * @param value
 */
function setQty(additionalId: string, itemId: string, value: number) {
  const index = qty.value.findIndex(
    (q) => q.item === itemId && q.additional === additionalId
  );
  if (index >= 0) {
    qty.value[index].qty = value;
    setOfferCart();
    canCompleteOperation();
  }
}
/**
 * setOfferCart
 * @param additionalId
 * @param itemId
 * @param qty
 */
function setOfferCart() {
  const additional: CartOfferAdditional[] = [];
  qty.value.forEach((q) => {
    const existsIndex = additional.findIndex((a) => a.id === q.additional);
    // get item data
    const itemData = getItemData(q.additional, q.item);
    // if exists
    if (itemData && q.qty) {
      // if already additional exists
      if (existsIndex >= 0) {
        additional[existsIndex].selected.push({
          ...itemData,
          qty: q.qty,
        });
      }
      // create additional
      else {
        additional.push({
          id: q.additional,
          selected: [
            {
              ...itemData,
              qty: q.qty,
            },
          ],
        });
      }
    }
  });
  $emit("set-offer", {
    qty: 1,
    type: "promos",
    offer: $props.promo,
    additional,
  });
}
/**
 * getItemData
 * @param additionalId
 * @param itemId
 */
function getItemData(additionalId: string, itemId: string) {
  const additional = $props.promo.additional.find((a) => a.id === additionalId);
  if (additional) {
    return additional.items.find((i) => i.id === itemId);
  }
  return undefined;
}
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  // Init qty
  $props.promo.additional.forEach((additional) => {
    if (!qty.value) qty.value = [];
    // init can add
    canAdd.value.push({ additional: additional.id as string, can: true });
    // init qty
    additional.items.forEach((item) => {
      qty.value.push({
        additional: additional.id as string,
        item: item.id,
        qty: 0,
      });
    });
  });
  cartOffer.value = {
    qty: 1,
    type: "promos",
    offer: $props.promo,
  };
  canCompleteOperation();
});
</script>

<template>
  <div class="space-y-2">
    <div class="p-2 text-center">{{ promo.desc }}</div>
    <!-- <div class="rounded-md bg-red-100 p-2">{{ promo.restrictions }}</div> -->
    <div
      class="rounded-lg bg-slate-200 py-4 px-8"
      v-for="(additional, aKey) in promo.additional"
      :key="`promo-add-${additional.id}-${aKey}`"
    >
      <div class="text-lg font-semibold">{{ additional.title }}</div>
      <div class="font-thin" v-if="additional.desc">{{ additional.desc }}</div>
      <div
        class="rounded-sm border p-2"
        v-for="(item, iKey) in additional.items"
        :key="`item-${item.id}-${iKey}-${additional.id}`"
      >
        <div class="flex items-center">
          <div class="flex-1">
            {{ item.name }}
          </div>
          <div class="flex-none cursor-pointer">
            <MultipleSelector
              :model-value="getQty(additional.id as string, item.id)"
              @update:model-value="(v) => setQty(additional.id as string, item.id, v)"
              :can-add="
                canAdd.find((c) => c.additional === additional.id)
                  ? canAdd.find((c) => c.additional === additional.id)?.can
                  : false
              "
              v-if="additional.type === 'multiple'"
            />
            <!-- <SimpleSelector
              :selected="getQty(additional.id, item.id)"
              can-select
              v-if="additional.type === 'check_box'"
            /> -->
            <div
              v-if="additional.type === 'check_box'"
              class="bg-red-500 p-4 text-3xl"
            >
              check_box
            </div>
            <!-- <SimpleSelector
              class="my-4"
              :price="ing.price"
              :label="ing.name"
              :selected="isSelected(ing.id)"
              @update:selected="() => handleSelect(ing.id)"
              v-for="(ing, iKey) in ingredients"
              :key="`ingredient2-${iKey}-${ing.id}`"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
