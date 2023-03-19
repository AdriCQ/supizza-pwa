<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { RouteLocationRaw, useRouter } from "vue-router";
import BaseIcon from "../BaseIcon.vue";

interface Props {
  back?: RouteLocationRaw | "back";
  title?: string;
}
const $props = defineProps<Props>();
const $router = useRouter();

function goBack() {
  if ($props.back) {
    if ($props.back === "back") void $router.back();
    else void $router.push($props.back);
  }
}
</script>

<template>
  <div class="fixed top-0 z-10 w-full p-2">
    <nav class="flex items-center px-4 py-2 text-slate-800">
      <!-- Back -->
      <div
        class="h-10 w-10 cursor-pointer rounded-full bg-white p-2 opacity-95 shadow-md"
        @click="goBack"
      >
        <BaseIcon
          :icon="mdiArrowLeft"
          size="100%"
          class-name="stroke-slate-800 fill-slate-800"
        />
      </div>

      <div class="flex-1 text-center text-lg opacity-95" v-if="title">
        {{ title }}
      </div>
    </nav>
  </div>
</template>
