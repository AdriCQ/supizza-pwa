<script setup lang="ts">
import BaseIcon from "../BaseIcon.vue";
import { mdiMagnify } from "@mdi/js";
import { ref } from "vue";

const search = ref("");
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <label class="flex-none" for="#search-input">
      <BaseIcon :icon="mdiMagnify" size="1.5rem" />
    </label>
    <div class="flex-1">
      <input
        id="search-input"
        v-model="search"
        type="search"
        class="p-xs input-bordered input input-md w-full max-w-xs rounded-md bg-white"
        placeholder="Buscar"
      />
    </div>
  </div>
</template>
