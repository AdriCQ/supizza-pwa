<script setup lang="ts">
import { mdiMinus, mdiPlus } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";

const $props = defineProps<{ modelValue: number; canAdd?: boolean }>();
const $emit = defineEmits<{ (e: "update:model-value", v: number): void }>();
/**
 * add
 */
function add() {
  if ($props.canAdd) $emit("update:model-value", $props.modelValue + 1);
}
/**
 * reduce
 */
function reduce() {
  if ($props.modelValue > 0) $emit("update:model-value", $props.modelValue - 1);
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex-none rounded bg-slate-500 p-1">
      <BaseIcon
        @click="reduce"
        :icon="mdiMinus"
        size="1.2rem"
        class="fill-white stroke-white"
      />
    </div>
    <div class="flex h-6 w-6 items-center justify-center">
      <span> {{ modelValue }} </span>
    </div>

    <div class="flex-none rounded bg-slate-700 p-1">
      <BaseIcon
        @click="add"
        :icon="mdiPlus"
        size="1.2rem"
        class="fill-white stroke-white"
      />
    </div>
  </div>
</template>
