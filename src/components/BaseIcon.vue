<script setup lang="ts">
import { computed } from "vue";

const $props = defineProps<{ icon: string; size?: string | number, round?: boolean; }>()

const iconSize = computed(() => $props.size ?? 14);
</script>

<template>
	<svg :width="iconSize" :height="iconSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
		stroke-width="1" stroke="currentColor" aria-hidden="true">
		<path :stroke-linecap="round ? 'round' : 'inherit'" :stroke-linejoin="round ? 'round' : 'inherit'" :d="icon" />
	</svg>
</template>
