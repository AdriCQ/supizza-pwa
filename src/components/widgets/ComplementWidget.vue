<script setup lang="ts">
import type { IComplement } from "@/types";

defineProps<{ complement: IComplement }>();
</script>

<template>
  <div class="relative w-full bg-white">
    <img
      :src="complement.img"
      :alt="complement.name"
      :title="complement.name"
      class="w-full"
    />

    <div
      class="absolute bottom-1 left-1 w-full rounded-full bg-slate-100 p-2 text-center text-sm opacity-90"
    >
      {{ complement.name }}
    </div>
  </div>
</template>
