<script setup lang="ts">
import type { ICartOffer, ICartOfferAdditional, IPromo } from "@/types";
import { ref, onBeforeMount } from "vue";
import MultipleSelector from "./selectors/MultipleSelector.vue";
import SimpleSelector from "@/components/forms/selectors/SimpleSelector.vue";

interface IQty {
  additional: number;
  item: number;
  qty: number;
}

interface ICanAdd {
  additional: number;
  can: boolean;
}

const $props = defineProps<{
  promo: IPromo;
}>();
const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: ICartOffer): void;
}>();

// Qty
const qty = ref<IQty[]>([]);
const cartOffer = ref<ICartOffer>({
  qty: 1,
  type: "promos",
});
// Can Add
const canAdd = ref<ICanAdd[]>([]);

function countItems(additionalId: number) {
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
function getQty(additionalId: number, itemId: number) {
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
function setQty(additionalId: number, itemId: number, value: number) {
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
  const additional: ICartOfferAdditional[] = [];
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
function getItemData(additionalId: number, itemId: number) {
  const additional = $props.promo.additional.find((a) => a.id === additionalId);
  if (additional) {
    return additional.items.find((i) => i.id === itemId);
  }
  return undefined;
}

onBeforeMount(() => {
  // Init qty
  $props.promo.additional.forEach((additional) => {
    if (!qty.value) qty.value = [];
    // init can add
    canAdd.value.push({ additional: additional.id, can: true });
    // init qty
    additional.items.forEach((item) => {
      qty.value.push({
        additional: additional.id,
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
  console.log("init", {
    canAdd: canAdd.value,
    promo: $props.promo,
    qty: qty.value,
  });
  canCompleteOperation();
});
</script>

<template>
  <div class="space-y-2">
    <div class="">{{ promo.desc }}</div>
    <div class="rounded-md bg-red-100 p-2">{{ promo.restrictions }}</div>
    <div
      v-for="(additional, aKey) in promo.additional"
      :key="`promo-add-${additional.id}-${aKey}`"
    >
      <div class="my-4 rounded-md bg-slate-200 p-2">{{ additional.title }}</div>
      <div class="">{{ additional.desc }}</div>
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
              :model-value="getQty(additional.id, item.id)"
              @update:model-value="(v) => setQty(additional.id, item.id, v)"
              :can-add="
                canAdd.find((c) => c.additional === additional.id)
                  ? canAdd.find((c) => c.additional === additional.id)?.can
                  : false
              "
              v-if="additional.type === 'multiple'"
            />
            <SimpleSelector
              :model-value="getQty(additional.id, item.id)"
              can-select
              v-if="additional.type === 'check_box'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
