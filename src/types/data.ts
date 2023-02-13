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
  img: string;
}
/**
 * IIngredient
 */
export interface IIngredient extends IDataItem {
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
