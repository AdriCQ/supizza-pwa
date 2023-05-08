<script setup lang="ts">
import { ref } from "vue";
import InputText from "./InputText.vue";
import type { UserCreate } from "@/types";

const step = ref(0);

const form = ref<UserCreate>({
  apellidos: "",
  nombres: "",
  telefono: "",
});
/**
 * handleSubmits
 */
async function handleSubmit() {
  if (step.value === 0) step.value++;
  console.log("onSubmit");
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <div class="card-body">
      <InputText
        v-if="step === 0"
        v-model="form.telefono"
        label="Teléfono"
        type="tel"
      /><InputText
        v-if="step === 1"
        v-model="form.apellidos"
        label="Confirme"
        type="text"
      />

      <div class="card-actions mt-2">
        <button
          class="btn-primary btn w-full rounded-full"
          type="submit"
        ></button>
      </div>
    </div>
  </form>
</template>
