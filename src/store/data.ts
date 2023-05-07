import type { Cart, CartOffer, SelectedDetails, ResponseData } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { $service } from "@/services";
/**
 * STORE_KEY
 */
const STORE_KEY = "pinia/useDataStore";
/**
 * useDataStore
 */
export const useDataStore = defineStore(STORE_KEY, () => {
  // Full Data
  const fullData = ref<ResponseData>();
  // Separated data
  const complements = computed(() => fullData.value?.complements);
  const drinks = computed(() => fullData.value?.drinks);
  const ingredients = computed(() => fullData.value?.ingredients);
  const pizzas = computed(() => fullData.value?.pizzas);
  const promos = computed(() => fullData.value?.promos);
  // categories
  const categories = computed(() => {
    const cat: string[] = [];
    for (const key in fullData.value) {
      cat.push(key);
    }
    return cat;
  });
  // Details Data
  const selected = ref<SelectedDetails>();
  // Cart
  const cart = ref<Cart>({
    offers: [],
    price: 0,
  });
  // Search
  const search = ref<string>();
  /**
   * addToCart
   * @param offer
   */
  function addToCart(offer: CartOffer) {
    // Check if exists
    let exists = false;
    console.log({ additionals: offer.additional });

    cart.value.offers.filter((cartOffer, key, _cart) => {
      if (cartOffer.offer) {
        // f offer is complement or drink check only id
        if (offer.type === "complements" || offer.type === "drinks") {
          // f exists add qty
          if (
            cartOffer.type === offer.type &&
            cartOffer.offer.id === offer.offer?.id
          ) {
            _cart[key].qty += offer.qty;
            exists = true;
          }
        }
        // f is promo or pizza
        else if (
          cartOffer.type === offer.type &&
          cartOffer.offer.id === offer.offer?.id
        ) {
          // f has same additional add qty
          if (
            JSON.stringify(cartOffer.additional) ===
            JSON.stringify(offer.additional)
          ) {
            _cart[key].qty += offer.qty;
            exists = true;
          } else {
            // _cart[key] = offer;
            console.log("Different");
          }
        }
      }
    });

    // f doesnt exists
    if (!exists) cart.value.offers.push(offer);
    // if (offer.offer) cart.value.price += addPrice;
    // Add offer price
    let addPrice = 0;
    if (offer.offer) {
      addPrice += offer.offer.price;
    }
    if (offer.additional && offer.additional.length) {
      offer.additional.forEach((additional) => {
        additional.selected.forEach((selected) => {
          addPrice += selected.price;
        });
      });
    }
    // Multiply for qty
    addPrice *= offer.qty;
    // Add to cart price
    cart.value.price += addPrice;
  }
  /**
   * removeFromCart
   * @param remove
   */
  function removeFromCart(remove: CartOffer) {
    const index = cart.value.offers.findIndex(
      (o) => o.type === remove.type && o.offer?.id === remove.offer?.id
    );
    if (index >= 0) {
      const cartOffer = cart.value.offers[index];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const price = cart.value.price - cartOffer.qty * cartOffer.offer?.price;
      cart.value.offers.splice(index, 1);
      cart.value.price = price;
    }
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
    categories,
    // Separated data
    complements,
    drinks,
    ingredients,
    promos,
    pizzas,
    // Details Data
    selected,
    // Search
    search,
    // Cart
    cart,
    // Methods
    addToCart,
    removeFromCart,
    loadData,
  };
});
