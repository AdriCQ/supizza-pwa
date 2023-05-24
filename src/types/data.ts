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
  id: number | string;
  selected: DataItem[];
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
export interface Drink extends DataItem {
  id: string;
  img: string;
}
/**
 * ngredient
 */
export interface Ingredient extends DataItem {
  id: string;
  selected?: boolean;
}
/**
 * Pizza
 */
export interface Pizza extends Omit<Promo, "desc"> {
  ingredients: NamePrice[];
  sizes: NamePrice[];
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

export type AdditionalType =
  | "Complementos"
  | "Bebidas"
  | "Valor fijo"
  | "Pizza-Chica"
  | "Pizza-Extra Grande"
  | "Pizza-Grande";

/**
 * DataAdditional
 */
export interface DataAdditional {
  id: string | number;
  additional_type: AdditionalType;
  title: string;
  desc: string;
  optional: boolean;
  type: "multiple" | "check_box" | "radio";
  min: number;
  max: number;
  items: DataItem[];
}

/**
 * DataItem
 */
export interface DataItem {
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
 * NamePrice (ingredients, sizes)
 */
export interface NamePrice {
  name: string;
  price: number;
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
