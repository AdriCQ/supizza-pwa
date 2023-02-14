<script setup lang="ts">
import type { IDrink } from "@/types";

defineProps<{ drink: IDrink }>();
</script>

<template>
  <div class="w-full bg-white">
    <img
      :src="drink.img"
      :alt="drink.name"
      :title="drink.name"
      class="w-full"
    />
  </div>
</template>
