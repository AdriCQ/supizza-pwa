<script setup lang="ts">
import type { IPromo } from "@/types";
import { ref, onBeforeMount } from "vue";
import MultipleSelector from "./MultipleSelector.vue";
import SimpleSelector from "./SimpleSelector.vue";

const $props = defineProps<{
  promo: IPromo;
}>();
const $emit = defineEmits<{ (e: "can-complete", v: boolean): void }>();

// Qty
const qty = ref();
// Can Add
const canAdd = ref<boolean[]>([]);
/**
 * canCompleteOperation
 */
function canCompleteOperation() {
  const canComplete: boolean[] = [];
  // Each additional
  $props.promo.additional.forEach((additional, aKey) => {
    // Total items in additional
    let total = 0;
    canComplete.push(false);
    // All Items
    additional.items.forEach((item, iKey) => {
      total += qty.value[aKey][iKey];
    });
    // is multiple?
    if (additional.type === "multiple") {
      // complete condition
      if (total <= additional.max && total >= additional.min)
        canComplete[aKey] = true;
      else canComplete[aKey] = false;
      // can o can't add
      if (total === additional.max) canAdd.value[aKey] = false;
      else if (total < additional.max) canAdd.value[aKey] = true;
    }
  });

  let finalComplete = true;
  canComplete.forEach((v) => {
    if (!v) finalComplete = false;
  });
  $emit("can-complete", finalComplete);
}
/**
 * handleUpdateQty
 * @param additionalKey
 * @param itemKey
 * @param value
 */
function handleUpdateQty(
  additionalKey: number,
  itemKey: number,
  value: number
) {
  qty.value[additionalKey][itemKey] = value;
  canCompleteOperation();
}

onBeforeMount(() => {
  $props.promo.additional.forEach((additional, aK) => {
    if (!qty.value) qty.value = [];
    if (!qty.value[aK]) qty.value[aK] = [];
    canAdd.value.push(true);
    additional.items.forEach(() => {
      qty.value[aK].push(0);
    });
  });
  canCompleteOperation();
});
</script>

<template>
  <div class="space-y-2">
    <div class="">{{ promo.desc }}</div>
    <div class="rounded-md bg-red-100 p-2">{{ promo.restrictions }}</div>
    <div v-for="(v, k) in promo.additional" :key="`promo-add-${k}`">
      <div class="my-4 rounded-md bg-slate-200 p-2">{{ v.title }}</div>
      <div class="">{{ v.desc }}</div>
      <div
        class="rounded-sm border p-2"
        v-for="(item, iKey) in v.items"
        :key="`item-${k}-${iKey}`"
      >
        <div class="flex items-center">
          <div class="flex-1">
            {{ item.name }}
          </div>
          <div class="flex-none cursor-pointer">
            <MultipleSelector
              :model-value="qty[k][iKey]"
              @update:model-value="(v) => handleUpdateQty(k, iKey, v)"
              :can-add="canAdd[k]"
              v-if="v.type === 'multiple'"
            />
            <SimpleSelector
              :model-value="qty[k][iKey]"
              can-select
              v-if="v.type === 'check_box'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
