<script setup lang="ts">
import { Address } from "@/types";
import BaseIcon from "../BaseIcon.vue";
import { mdiDelete } from "@mdi/js";

interface Props {
  address: Address;
}

defineProps<Props>();
</script>

<template>
  <div class="rounded-md border border-slate-200 p-2">
    <div class="flex gap-2">
      <div class="flex-1">
        <div class="font-semibold">{{ address.nombre }}</div>
        <div class="font-thin">
          {{ address.calle }} #{{ address.numero_int }}, {{ address.colonia }}
        </div>
      </div>
      <div class="flex-none cursor-pointer">
        <BaseIcon
          :icon="mdiDelete"
          class="fill-red-200 stroke-error"
          size="1.1rem"
        />
      </div>
    </div>
  </div>
</template>
