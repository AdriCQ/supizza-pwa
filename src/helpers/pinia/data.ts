import type { ISelectedDetails, IResponseData } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { $service } from "../service";
/**
 * STORE_KEY
 */
const STORE_KEY = "pinia/useDataStore";
/**
 * useDataStore
 */
export const useDataStore = defineStore(STORE_KEY, () => {
  const fullData = ref<IResponseData>();
  // Separated data
  const complements = computed(() => fullData.value?.complements);
  const drinks = computed(() => fullData.value?.drinks);
  const ingredients = computed(() => fullData.value?.ingredients);
  const pizzas = computed(() => fullData.value?.pizzas);
  const promos = computed(() => fullData.value?.promos);
  // Details Data
  const selected = ref<ISelectedDetails>();
  // Cart
  const cart = ref([]);
  /**
   * loadData
   */
  async function loadData() {
    const resp = await $service.loadData();
    fullData.value = resp.data;
  }

  return {
    fullData,
    // Separated data
    complements,
    drinks,
    ingredients,
    promos,
    pizzas,
    // Details Data
    selected,
    // Cart
    cart,
    // Methods
    loadData,
  };
});
