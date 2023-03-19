<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: "text" | "tel" | "email" | "number" | "password" | "price";
  label?: string;
  required?: boolean;
  readonly?: boolean;
  inputClass?: string;
  labelClass?: string;
  placeholder?: string;
  subtitle?: string;
}
withDefaults(defineProps<Props>(), {
  type: "text",
  idKey: Date.now().toString(),
  inputClass: "bg-slate-100",
});
const $emit = defineEmits<{
  (e: "update:model-value", val: string | number): void;
}>();
const uuid = crypto.randomUUID();

function updateValue(ev: Event) {
  $emit("update:model-value", (ev.target as HTMLInputElement)?.value);
}
</script>

<template>
  <div class="form-control">
    <label :for="`#input-${uuid}`" class="label" v-if="label">
      <span>{{ label }}</span>
    </label>

    <p
      class="label text-justify text-xs font-thin text-slate-500"
      v-if="subtitle"
    >
      {{ subtitle }}
    </p>
    <input
      :id="`input-${uuid}`"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="input w-full max-w-xs bg-slate-50"
      :required="required"
      @change="updateValue"
    />
  </div>
</template>
