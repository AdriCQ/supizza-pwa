<script setup lang="ts">
import { ref } from "vue";
import type { NamePrice } from "@/types";
import SimpleSelector from "./SimpleSelector.vue";

const $emit = defineEmits<{
  (e: "set-size", v: NamePrice): void;
  (e: "ready", v: boolean): void;
}>();
const $props = defineProps<{ sizes: NamePrice[] }>();

const selected = ref<NamePrice>();

/**
 * isSelected
 * @param sizeKey
 */
function isSelected(sizeKey: number): boolean {
  if (selected.value) return selected.value.name === $props.sizes[sizeKey].name;
  return sizeKey === 0;
}

/**
 * handleSelect
 * @param sizeKey
 */
function handleSelect(sizeKey: number) {
  selected.value = $props.sizes[sizeKey];
  $emit("set-size", selected.value);
}
</script>

<template>
  <div class="rounded-lg bg-slate-200 py-4 px-8">
    <div class="text-center text-lg font-semibold">Seleccione el tamaño</div>
    <div class="mt-2">
      <SimpleSelector
        class="my-4"
        :price="size.price"
        :label="size.name"
        :selected="isSelected(iKey)"
        @update:selected="() => handleSelect(iKey)"
        v-for="(size, iKey) in sizes"
        :key="`size-${iKey}-${size.name}`"
      />
    </div>
  </div>
</template>
