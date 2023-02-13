<script setup lang="ts">
import type { IIngredient } from "@/types";

defineProps<{ ingredient: IIngredient }>();
</script>

<template>
  <div class="bg-white">
    {{ ingredient }}
  </div>
</template>
