<script setup lang="ts">
import { mdiMinus, mdiPlus } from "@mdi/js";
import BaseIcon from "../BaseIcon.vue";

const $props = defineProps<{ modelValue: number; canAdd?: boolean }>();
const $emit = defineEmits<{ (e: "update:model-value", v: number): void }>();

function add() {
  if ($props.canAdd) $emit("update:model-value", $props.modelValue + 1);
}

function reduce() {
  if ($props.modelValue > 0) $emit("update:model-value", $props.modelValue - 1);
}
</script>

<template>
  <div class="flex items-center justify-between">
    <template v-if="modelValue > 0">
      <div class="flex-none">
        <BaseIcon
          @click="reduce"
          :icon="mdiMinus"
          size="1.2rem"
          class="fill-primary stroke-primary"
        />
      </div>
      <div
        class="flex h-6 w-6 items-center justify-center text-sm text-primary"
      >
        <span> {{ modelValue }} </span>
      </div>
    </template>

    <div class="flex-none" v-if="canAdd">
      <BaseIcon
        @click="add"
        :icon="mdiPlus"
        size="1.2rem"
        class="fill-primary stroke-primary"
      />
    </div>
  </div>
</template>
