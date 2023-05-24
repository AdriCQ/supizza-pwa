<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { RouteLocationRaw, useRouter } from "vue-router";
import BaseIcon from "../BaseIcon.vue";

interface Props {
  back?: RouteLocationRaw;
  title?: string;
}
const $props = defineProps<Props>();
const $router = useRouter();

function goBack() {
  if ($props.back) {
    $router.push($props.back);
  }
}
</script>

<template>
  <div class="fixed top-0 z-10 w-full p-2 text-primary">
    <nav class="flex items-center px-4 py-2">
      <!-- Back -->
      <div
        class="h-10 w-10 cursor-pointer rounded-full bg-white p-2 opacity-95 shadow-md"
        @click="goBack"
      >
        <BaseIcon
          :icon="mdiArrowLeft"
          size="100%"
          class="fill-primary stroke-primary"
        />
      </div>

      <div class="flex-1 text-center text-lg opacity-95" v-if="title">
        {{ title }}
      </div>
    </nav>
  </div>
</template>
