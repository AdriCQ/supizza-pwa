<script setup lang="ts">
import type { ICartOffer, IComplement, IDrink, IPizza, IPromo } from "@/types";
import { computed } from "vue";
import { toCurrency } from "@/helpers";
import BaseIcon from "../BaseIcon.vue";
import { mdiDelete, mdiPencil } from "@mdi/js";

interface IProps {
  cartOffer: ICartOffer;
}
const $props = defineProps<IProps>();
const $emit = defineEmits<{
  (e: "delete", v: ICartOffer): void;
  (e: "edit", v: ICartOffer): void;
}>();

const title = computed(() => {
  switch ($props.cartOffer.type) {
    case "complements":
      return ($props.cartOffer.offer as IComplement).name;
    case "drinks":
      return ($props.cartOffer.offer as IDrink).name;
    case "ingredients":
      return "";
    case "pizzas":
      return ($props.cartOffer.offer as IPizza).title;
    case "promos":
      return ($props.cartOffer.offer as IPromo).title;
    default:
      return "";
  }
});
</script>

<template>
  <div class="flex gap-2">
    <!-- Main Content -->
    <div class="flex-1">
      <div class="inline-block h-2 w-2 rounded-full bg-slate-800"></div>
      <div class="ml-2 inline-block">
        <span class="mr-1" v-if="cartOffer.qty > 1"> x{{ cartOffer.qty }}</span>
        {{ title }}
      </div>
      <ul
        v-for="(add, key) in cartOffer.additional"
        :key="`additional-${key}-add-${add.id}`"
      >
        <li
          v-for="(sel, selKey) in add.selected"
          :key="`selecetd-${add.id}-${key}-${selKey}-${sel.id}`"
          class="flex gap-2 pl-4"
        >
          -
          <div class="flex-1">
            <span class="mx-1">x{{ sel.qty }}</span>
            <span class="mx-1">{{ sel.name }}</span>
          </div>
          <div class="flex-none" v-if="sel.price">
            {{ toCurrency(sel.price) }}
          </div>
        </li>
      </ul>
    </div>
    <!-- / Main Content -->
    <!-- Action Butons -->
    <div class="flex-none">
      <!-- <button
        class="btn-sm btn block bg-slate-700"
        @click="() => $emit('edit', cartOffer)"
      >
        <BaseIcon
          :icon="mdiPencil"
          size="1.5rem"
          class="fill-white stroke-white"
        />
      </button> -->
      <button
        class="btn-sm btn mt-1 block border-error bg-white"
        @click="() => $emit('delete', cartOffer)"
      >
        <BaseIcon :icon="mdiDelete" size="1.5rem" class="stroke-error" />
      </button>
    </div>
    <!-- / Action Butons -->
  </div>
</template>
