<script setup lang="ts">
import BaseIcon from "../BaseIcon.vue";
import { mdiHome, mdiCart, mdiAccount, mdiMapMarker } from "@mdi/js";

const itemClass = "flex flex-1 justify-center cursor-pointer";
</script>

<template>
  <nav
    id="nav-bottom"
    class="flex gap-1 rounded-full border bg-white p-4 shadow-xl"
  >
    <div :class="itemClass">
      <BaseIcon :icon="mdiHome" size="1.8rem" />
    </div>
    <div :class="itemClass">
      <div class="relative">
        <BaseIcon :icon="mdiCart" size="1.8rem" />
        <div
          class="absolute top-0 right-0 z-10 flex h-4 w-4 -translate-y-3 translate-x-2 items-center justify-center rounded-full bg-green-500 text-xs"
        >
          1
        </div>
      </div>
    </div>
    <div :class="itemClass">
      <BaseIcon :icon="mdiMapMarker" size="1.8rem" />
    </div>
    <div :class="itemClass">
      <BaseIcon :icon="mdiAccount" size="1.8rem" />
    </div>
  </nav>
</template>
