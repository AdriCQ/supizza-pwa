<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiCart } from "@mdi/js";
</script>

<template>
  <div
    class="right-2rounded-full fixed bottom-2 border-white bg-yellow-500 p-3 shadow-md"
  >
    <BaseIcon :icon="mdiCart" size="1.8rem" class="stroke-white stroke-1" />
  </div>
</template>
