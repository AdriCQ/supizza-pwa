export interface Cart {
  offers: CartOffer[];
  price: number;
}
export interface Search {
  type: ResponseDataKey;
  offer?: Complement | Drink | Pizza | Promo;
}
/**
 * CartOffer
 */
export interface CartOffer extends Search {
  additional?: CartOfferAdditional[];
  qty: number;
}

export interface CartOfferAdditional {
  id: string;
  selected: Datatem[];
}
/**
 * Complement
 */
export interface Complement extends Drink {
  weight: string;
}

/**
 * Drink
 */
export interface Drink extends Datatem {
  id: string;
  img: string;
}
/**
 * ngredient
 */
export interface Ingredient extends Datatem {
  id: string;
  selected?: boolean;
}
/**
 * Pizza
 */
export interface Pizza extends Omit<Promo, "desc"> {
  ingredients: string[];
}
/**
 * Promo
 */
export interface Promo {
  id: string;
  title: string;
  img: string;
  price: number;
  desc: string;
  restrictions: string;
  additional: DataAdditional[];
}

/**
 * -----------------------------------------
 *	Extra
 * -----------------------------------------
 */

/**
 * DataAdditional
 */
export interface DataAdditional {
  id: string;
  title: string;
  desc: string;
  optional: boolean;
  type: "multiple" | "check_box";
  min: number;
  max: number;
  items: Datatem[];
}

/**
 * Datatem
 */
export interface Datatem {
  name: string;
  desc: string;
  price: number;
  qty: number;
  id: string;
}

/**
 * SelectedDetails
 */
export interface SelectedDetails {
  type: ResponseDataKey;
  value: Complement | Drink | Pizza | Promo;
}
/**
 * -----------------------------------------
 *	Request
 * -----------------------------------------
 */
/**
 * ResponseData
 */
export interface ResponseData {
  complements: Complement[];
  drinks: Drink[];
  ingredients: Ingredient[];
  pizzas: Pizza[];
  promos: Promo[];
}
/**
 * ResponseDataKey
 */
export type ResponseDataKey = keyof ResponseData;
