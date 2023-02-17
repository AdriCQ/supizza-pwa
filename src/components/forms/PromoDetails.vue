<script setup lang="ts">
import type { IPromo } from "@/types";
import { mdiPlus } from "@mdi/js";
import BaseIcon from "../BaseIcon.vue";

defineProps<{
  promo: IPromo;
}>();
</script>

<template>
  <div class="space-y-2">
    <div class="">{{ promo.desc }}</div>
    <div class="rounded-md bg-red-100 p-2">{{ promo.restrictions }}</div>
    <div v-for="(v, k) in promo.additional" :key="`promo-add-${k}`">
      <div class="my-4 rounded-md bg-slate-200 p-2">{{ v.title }}</div>
      <div class="">{{ v.desc }}</div>

      <div
        class="rounded-sm border p-2"
        v-for="(item, iKey) in v.items"
        :key="`item-${k}-${iKey}`"
      >
        <div class="flex items-center">
          <div class="flex-1">
            {{ item.name }}
          </div>
          <div class="flex-none cursor-pointer rounded-full bg-slate-100 p-2">
            <BaseIcon :icon="mdiPlus" size="1rem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
