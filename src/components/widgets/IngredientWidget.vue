<script setup lang="ts">
import type { IIngredient } from "@/types";

defineProps<{ ingredient: IIngredient }>();
</script>

<template>
  <div class="w-full bg-white">
    {{ ingredient }}
  </div>
</template>
