<script setup lang="ts">
import { ref } from "vue";
import { mdiMagnify } from "@mdi/js";
import { useDataStore } from "@/store";
import BaseIcon from "../BaseIcon.vue";

const $store = useDataStore();

const search = ref();

function onSubmit() {
  console.log("submit");
  $store.searchData(search.value);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex items-center justify-center gap-2">
      <label
        class="flex-none"
        for="#search-input"
        @click="() => $emit('search')"
      >
        <BaseIcon
          :icon="mdiMagnify"
          size="1.5rem"
          class="fill-primary stroke-primary"
        />
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
  </form>
</template>
