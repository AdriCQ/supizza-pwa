<script setup lang="ts">
import BaseIcon from "../BaseIcon.vue";
import { mdiMagnify } from "@mdi/js";

const $emit = defineEmits<{
  (e: "update:model-value", v: string): void;
  (e: "search"): void;
}>();
defineProps<{ modelValue: string }>();

function handleOnChange(e: Event) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $emit("update:model-value", e.target.value);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e.target.value === "") $emit("search");
}
</script>

<template>
  <form @submit.prevent="() => $emit('search')">
    <div class="flex items-center justify-center gap-2">
      <label
        class="flex-none"
        for="#search-input"
        @click="() => $emit('search')"
      >
        <BaseIcon :icon="mdiMagnify" size="1.5rem" />
      </label>
      <div class="flex-1">
        <input
          id="search-input"
          :value="modelValue"
          @change="handleOnChange"
          type="search"
          class="p-xs input-bordered input input-md w-full max-w-xs rounded-md bg-white"
          placeholder="Buscar"
        />
      </div>
    </div>
  </form>
</template>
