import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@/helpers";
import type { Complement, Drink, Pizza, PizzaIngredient, Promo } from "@/types";
import { useService } from "@/services";
/**
 * STORE_KEY
 */
const STORE_KEY = "pinia/useDataStore";
const storage = useStorage<Storage>(STORE_KEY);
const $service = useService();
/**
 * useDataStore
 */
export const useDataStore = defineStore(STORE_KEY, () => {
  const cart = ref<unknown[]>([]);

  const complements = ref<Complement[]>([]);
  const drinks = ref<Drink[]>([]);
  const pizzas = ref<Pizza[]>([]);
  const pizzaIngredients = ref<PizzaIngredient[]>([]);
  const promos = ref<Promo[]>([]);

  const search = ref<unknown[]>();

  /**
   * getOffers
   */
  async function getOffers() {
    // obtener datos en paralelo
    // Se obtienen los ingredientes, complementos y bebidas que no dependen de nada
    const listIngredient = new Promise((resolve, reject) => {
      $service.offers
        .listIngredient()
        .then((resp) => {
          pizzaIngredients.value = resp.data;
          resolve(pizzaIngredients.value);
        })
        .catch((error) => reject(error));
    });
    const listComplement = new Promise((resolve, reject) => {
      $service.offers
        .listComplement()
        .then((resp) => {
          complements.value = resp.data;
          resolve(complements.value);
        })
        .catch((error) => reject(error));
    });
    const listDrink = new Promise((resolve, reject) => {
      $service.offers
        .listDrink()
        .then((resp) => {
          drinks.value = resp.data;
          resolve(drinks.value);
        })
        .catch((error) => reject(error));
    });

    // Obtener datos de complementos, bebidas e ingredientes
    Promise.all([listComplement, listDrink, listIngredient]);

    // Obtener datos que dependen de los anteriores
    pizzas.value = (await $service.offers.listPizza()).data;
    promos.value = (await $service.offers.listPromo()).data;
  }

  return {
    // Data
    cart,
    complements,
    drinks,
    pizzas,
    pizzaIngredients,
    promos,
    search,
    // Methods
    getOffers,
  };
});

interface Storage {
  cart: undefined;
}
