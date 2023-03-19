<script setup lang="ts">
import { toCurrency } from "@/helpers";

defineProps<{
  selected: boolean;
  label: string;
  price?: number;
}>();
const $emit = defineEmits<{ (e: "update:selected", v: boolean): void }>();
</script>

<template>
  <div class="flex" @click="() => $emit('update:selected', !selected)">
    <div class="flex-1">{{ label }}</div>
    <div class="ml-1 flex-none" v-if="price">
      <div>{{ toCurrency(price) }}</div>
    </div>
    <div class="flex-none">
      <div
        class="h-6 w-6 cursor-pointer rounded-full border border-slate-700 p-1"
      >
        <div
          v-if="selected"
          class="h-full w-full rounded-full bg-primary"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.check {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  border: solid 1px;
  cursor: pointer;
  padding: 0.2rem;
}

.check-selected {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
