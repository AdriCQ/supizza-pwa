export interface ICart {
  offers: ICartOffer[];
  price: number;
}
/**
 * ICartOffer
 */
export interface ICartOffer {
  type: IResponseDataKey;
  offer?: IComplement | IDrink | IPizza | IPromo;
  additional?: [ICartOfferAdditional];
  qty: number;
}

export interface ICartOfferAdditional {
  id: number;
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
  id: number;
  img: string;
}
/**
 * IIngredient
 */
export interface IIngredient extends IDataItem {
  id: number;
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
  id: number;
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
  id: number;
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
}

/**
 * ISelectedDetails
 */
export interface ISelectedDetails {
  type: IResponseDataKey;
  value: IPizza | IPromo;
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
