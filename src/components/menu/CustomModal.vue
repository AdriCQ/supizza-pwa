<script setup lang="ts">
interface IProps {
  name: string;
  modelValue: boolean;
}
defineProps<IProps>();
defineEmits<{ (e: "update:modelValue", v: boolean): void }>();
</script>

<template>
  <!-- Put this part before </body> tag -->
  <input
    type="checkbox"
    :id="name"
    class="modal-toggle"
    @click="() => $emit('update:modelValue', false)"
  />
  <label
    :for="name"
    class="modal cursor-pointer"
    :class="{ 'modal-open': modelValue }"
  >
    <label class="modal-box relative" for="">
      <slot />
    </label>
  </label>
</template>
