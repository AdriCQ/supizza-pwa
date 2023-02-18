<script setup lang="ts">
const $props = defineProps<{ modelValue: number; canSelect?: boolean }>();
const $emit = defineEmits<{ (e: "update:model-value", v: number): void }>();
</script>

<template>
  <div>{{ modelValue }}</div>
</template>
