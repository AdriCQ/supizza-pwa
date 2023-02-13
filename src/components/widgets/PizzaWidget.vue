<script setup lang="ts">
import { IPizza } from "@/types";

defineProps<{ pizza: IPizza }>();
</script>

<template>
  <div class="bg-white">
    <img
      :src="pizza.img"
      :alt="pizza.title"
      :title="pizza.title"
      class="w-full"
    />
  </div>
</template>
