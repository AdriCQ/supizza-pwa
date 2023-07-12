import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useStorage } from "@/helpers";
import type {
  Complement,
  Drink,
  PedidoCreate,
  Pizza,
  PizzaIngredient,
  Promo,
} from "@/types";
import { useService } from "@/services";
/**
 * STORE_KEY
 */
const STORE_KEY = "pinia/useDataStore";
const $storage = useStorage<Storage>(STORE_KEY);
const $service = useService();
/**
 * useDataStore
 */
export const useDataStore = defineStore(STORE_KEY, () => {
  const complements = ref<Complement[]>([]);
  const drinks = ref<Drink[]>([]);
  const pizzas = ref<Pizza[]>([]);
  const pizzaIngredients = ref<PizzaIngredient[]>([]);
  const promos = ref<Promo[]>([]);

  const search = ref<SearchData>({
    bebidas: [],
    complementos: [],
    pizzas: [],
    promos: [],
  });

  const isSearch = computed(
    () =>
      search.value.bebidas.length ||
      search.value.complementos.length ||
      search.value.pizzas.length ||
      search.value.promos.length
  );

  const pedido = ref<PedidoCreate>({
    bebidas: [],
    cliente: "",
    complementos: [],
    direccion: "",
    entrega: "",
    forma_pago: "Efectivo",
    nota: "",
    pizzas: [],
    promos: [],
    sucursal: "",
    tipo: "Panel",
    total: 0,
    pagado: false,
    status: "Pendiente",
  });
  const pedidoCounter = ref(0);
  const pedidoPrecio = ref(0);

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
    const listPizza = new Promise((resolve, reject) => {
      $service.offers
        .listPizza()
        .then((resp) => {
          pizzas.value = resp.data;
          resolve(pizzas.value);
        })
        .catch((error) => reject(error));
    });
    const listPromo = new Promise((resolve, reject) => {
      $service.offers
        .listPromo()
        .then((resp) => {
          promos.value = resp.data;
          resolve(promos.value);
        })
        .catch((error) => reject(error));
    });

    // Obtener datos de complementos, bebidas e ingredientes
    Promise.all([
      listPizza,
      listPromo,
      listComplement,
      listDrink,
      listIngredient,
    ]);
  }

  /**
   * addToPedido
   * @returns
   */
  function addToPedido(params: AddToPedido) {
    let offerIndex: number;
    const { cantidad, offert, precio, tipo } = params;

    switch (tipo) {
      case "bebida":
        offerIndex = pedido.value.bebidas.findIndex(
          (b) => b._id == (offert as Drink)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          pedido.value.bebidas[offerIndex].cantidad++;
        }
        // si no existe añadir
        else {
          pedido.value.bebidas.push({
            ...(offert as Drink),
            cantidad,
            tipo,
            precio: precio,
          });
        }
        break;
      case "complemento":
        offerIndex = pedido.value.complementos.findIndex(
          (b) => b._id == (offert as Complement)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          pedido.value.complementos[offerIndex].cantidad++;
        }
        // si no existe añadir
        else {
          pedido.value.complementos.push({
            ...(offert as Complement),
            cantidad,
            tipo,
            precio: precio,
          });
        }

        break;
      case "pizza":
        offerIndex = pedido.value.pizzas.findIndex(
          (b) => b._id == (offert as Pizza)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          pedido.value.pizzas[offerIndex].cantidad++;
        }
        // si no existe añadir
        else {
          pedido.value.pizzas.push({
            ...(offert as Pizza),
            cantidad,
            tipo,
            precio: precio,
          });
        }

        break;
      case "promo":
        offerIndex = pedido.value.promos.findIndex(
          (b) => b._id == (offert as Promo)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          pedido.value.promos[offerIndex].cantidad++;
        }
        // si no existe añadir
        else {
          pedido.value.promos.push({
            ...(offert as Promo),
            cantidad,
            tipo,
            precio: precio,
          });
        }

        break;
      default:
        return;
    }

    console.log({ pedido: pedido.value });

    pedidoCounter.value += cantidad;
    pedidoPrecio.value += precio;

    saveStorage();
  }

  /**
   * removeFromPedido
   * @param offert
   * @param tipo
   * @returns
   */
  function removeFromPedido(params: AddToPedido) {
    let offerIndex: number;
    const { cantidad, offert, precio, tipo } = params;

    switch (tipo) {
      case "bebida":
        offerIndex = pedido.value.bebidas.findIndex(
          (b) => b._id == (offert as Drink)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          // reducir cantidad
          pedidoCounter.value -= pedido.value.bebidas[offerIndex].cantidad;
          // eliminar del pedido
          pedido.value.bebidas.splice(offerIndex);
        }
        break;
      case "complemento":
        offerIndex = pedido.value.complementos.findIndex(
          (b) => b._id == (offert as Complement)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          // eliminar del pedido
          pedido.value.complementos.splice(offerIndex);
        }
        break;
      case "pizza":
        offerIndex = pedido.value.pizzas.findIndex(
          (b) => b._id == (offert as Pizza)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          // eliminar del pedido
          pedido.value.pizzas.splice(offerIndex);
        }
        break;
      case "promo":
        offerIndex = pedido.value.promos.findIndex(
          (b) => b._id == (offert as Promo)._id
        );
        // ya existe
        if (offerIndex >= 0) {
          // eliminar del pedido
          pedido.value.promos.splice(offerIndex);
        }
        break;
      default:
        return;
    }

    pedidoCounter.value -= cantidad;
    pedidoPrecio.value -= precio;

    saveStorage();
  }

  /**
   * searchData
   * @param data
   */
  function searchData(searchString?: string) {
    if (searchString) {
      const data = searchString.toLocaleLowerCase();
      // buscar bebidas
      const bebidasSearch: Drink[] = [];
      drinks.value.forEach((drink) => {
        if (drink.nombre.toLocaleLowerCase().includes(data))
          bebidasSearch.push(drink);
      });

      // buscar complementos
      const complementosSearch: Complement[] = [];
      complements.value.forEach((c) => {
        if (c.nombre.toLocaleLowerCase().includes(data))
          complementosSearch.push(c);
      });

      // buscar pizzas
      const pizzasSearch: Pizza[] = [];
      pizzas.value.forEach((c) => {
        if (c.nombre.toLocaleLowerCase().includes(data)) pizzasSearch.push(c);
      });

      // buscar promos
      const promosSearch: Promo[] = [];
      promos.value.forEach((c) => {
        if (c.nombre.toLocaleLowerCase().includes(data)) promosSearch.push(c);
      });

      // asignar a la busqueda
      search.value = {
        bebidas: bebidasSearch,
        complementos: complementosSearch,
        pizzas: pizzasSearch,
        promos: promosSearch,
      };
    } else {
      search.value = {
        bebidas: [],
        complementos: [],
        pizzas: [],
        promos: [],
      };
    }
  }

  function clearStorage() {
    $storage.remove();
  }

  /**
   * loadStorage
   */
  function loadStorage() {
    const data = $storage.get();
    if (data) {
      pedido.value = data.pedido;
      pedidoCounter.value = data.pedidoCounter;
      pedidoPrecio.value = data.pedidoPrecio;
    }
  }

  function saveStorage() {
    $storage.set({
      pedido: pedido.value,
      pedidoCounter: pedidoCounter.value,
      pedidoPrecio: pedidoPrecio.value,
    });
  }

  return {
    // Data
    complements,
    drinks,
    pedido,
    pedidoCounter,
    pedidoPrecio,
    pizzas,
    pizzaIngredients,
    promos,
    search,
    isSearch,
    // Methods
    addToPedido,
    clearStorage,
    getOffers,
    loadStorage,
    removeFromPedido,
    searchData,
  };
});

interface Storage {
  pedido: PedidoCreate;
  pedidoCounter: number;
  pedidoPrecio: number;
}

interface AddToPedido {
  offert: Pizza | Promo | Complement | Drink;
  tipo: "bebida" | "complemento" | "pizza" | "promo";
  cantidad: number;
  precio: number;
}

export interface SearchData {
  bebidas: Drink[];
  complementos: Complement[];
  pizzas: Pizza[];
  promos: Promo[];
}
