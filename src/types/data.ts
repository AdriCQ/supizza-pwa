export interface ICart {
  offers: ICartOffer[];
  price: number;
}
export interface ISearch {
  type: IResponseDataKey;
  offer?: IComplement | IDrink | IPizza | IPromo;
}
/**
 * ICartOffer
 */
export interface ICartOffer extends ISearch {
  additional?: ICartOfferAdditional[];
  qty: number;
}

export interface ICartOfferAdditional {
  id: string;
  selected: IDataItem[];
}
/**
 * IComplement
 */
export interface IComplement extends IDrink {
  weight: string;
}

/**
 * IDrink
 */
export interface IDrink extends IDataItem {
  id: string;
  img: string;
}
/**
 * IIngredient
 */
export interface IIngredient extends IDataItem {
  id: string;
  selected?: boolean;
}
/**
 * IPizza
 */
export interface IPizza extends Omit<IPromo, "desc"> {
  ingredients: string[];
}
/**
 * IPromo
 */
export interface IPromo {
  id: string;
  title: string;
  img: string;
  price: number;
  desc: string;
  restrictions: string;
  additional: IDataAdditional[];
}

/**
 * -----------------------------------------
 *	Extra
 * -----------------------------------------
 */

/**
 * IDataAdditional
 */
export interface IDataAdditional {
  id: string;
  title: string;
  desc: string;
  optional: boolean;
  type: "multiple" | "check_box";
  min: number;
  max: number;
  items: IDataItem[];
}

/**
 * IDataItem
 */
export interface IDataItem {
  name: string;
  desc: string;
  price: number;
  qty: number;
  id: string;
}

/**
 * ISelectedDetails
 */
export interface ISelectedDetails {
  type: IResponseDataKey;
  value: IComplement | IDrink | IPizza | IPromo;
}
/**
 * -----------------------------------------
 *	Request
 * -----------------------------------------
 */
/**
 * IResponseData
 */
export interface IResponseData {
  complements: IComplement[];
  drinks: IDrink[];
  ingredients: IIngredient[];
  pizzas: IPizza[];
  promos: IPromo[];
}
/**
 * IResponseDataKey
 */
export type IResponseDataKey = keyof IResponseData;
