import type {
  ICart,
  ICartOffer,
  ISelectedDetails,
  IResponseData,
} from "@/types";
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
  const cart = ref<ICart>({
    offers: [],
    price: 0,
  });
  /**
   * addToCart
   * @param offer
   */
  function addToCart(offer: ICartOffer) {
    // Check if exists
    let exists = false;

    cart.value.offers.filter((cartOffer, key, _cart) => {
      if (cartOffer.offer) {
        // If offer is complement or drink check only id
        if (offer.type === "complements" || offer.type === "drinks") {
          // If exists add qty
          if (
            cartOffer.type === offer.type &&
            cartOffer.offer.id === offer.offer?.id
          ) {
            _cart[key].qty += offer.qty;
            exists = true;
          }
        }
        // If is promo or pizza
        else if (
          cartOffer.type === offer.type &&
          cartOffer.offer.id === offer.offer?.id
        ) {
          // If has same additional add qty
          if (cartOffer.additional === offer.additional) {
            _cart[key].qty += offer.qty;
            exists = true;
          } else {
            _cart[key] = offer;
          }
        }
      }
    });

    // If doesnt exists
    if (!exists) cart.value.offers.push(offer);
  }
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
    addToCart,
    loadData,
  };
});
