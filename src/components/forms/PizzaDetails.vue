<script setup lang="ts">
import { IPizza } from "@/types";

const $props = defineProps<{ pizza: IPizza }>();
</script>

<template>
  <div class="space-y-2">
    <div class="rounded-sm bg-red-200 p-2">{{ pizza.restrictions }}</div>
  </div>
</template>
