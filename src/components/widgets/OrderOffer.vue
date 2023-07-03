<script setup lang="ts">
import type { Complement, Drink, Pizza, Promo } from "@/types";
import BaseIcon from "../BaseIcon.vue";
import { mdiDelete } from "@mdi/js";

interface Props {
  offer: Complement | Drink | Pizza | Promo;
  cantidad: number;
  type: "bebida" | "complemento" | "pizza" | "promo";
  editable?: boolean;
}

defineProps<Props>();
const $emit = defineEmits<{
  (e: "delete"): void;
  (e: "edit"): void;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- <div class="inline-block h-2 w-2 rounded-full bg-slate-800"></div> -->
      <div class="ml-2 inline-block">
        <span class="mr-1"> x{{ cantidad }}</span>
        <span class="capitalize">
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}:
          {{ offer.nombre }}
        </span>
      </div>
    </div>
    <!-- / Main Content -->
    <!-- Action Butons -->
    <div class="flex-none" v-if="editable">
      <button
        class="btn-sm btn mt-1 block border-error bg-white"
        @click="() => $emit('delete')"
      >
        <BaseIcon :icon="mdiDelete" size="1.5rem" class="stroke-error" />
      </button>
    </div>
    <!-- / Action Butons -->
  </div>
</template>
