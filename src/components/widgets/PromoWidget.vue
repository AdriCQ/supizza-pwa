<script setup lang="ts">
import { IPromo } from "@/types";

defineProps<{ promo: IPromo }>();
</script>

<template>
  <div class="w-full bg-white">
    <img
      :src="promo.img"
      :alt="promo.title"
      :title="promo.title"
      class="w-full"
    />
  </div>
</template>
