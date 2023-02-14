<script setup lang="ts">
import type { IComplement } from "@/types";

defineProps<{ complement: IComplement }>();
</script>

<template>
  <div class="w-full bg-white">
    <img
      :src="complement.img"
      :alt="complement.name"
      :title="complement.name"
      class="w-full"
    />
  </div>
</template>
