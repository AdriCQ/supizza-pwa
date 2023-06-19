import type { UrlImage } from "./global";

export interface Complement {
  _id: string;
  urlImg: UrlImage;
  peso: number;
  precio: number;
  descripcion: string;
  nombre: string;
}

export interface Drink {
  _id: string;
  stock: number;
  precio: number;
  nombre: string;
  urlImg: UrlImage;
}

export interface Pizza {
  _id: string;
  urlImg: UrlImage;
  tamanos: PizzaSize[];
  ingredientes: PizzaIngredient[];
  limite_ingr: number;
  descripcion: string;
  nombre: string;
}

export interface PizzaSize {
  _id: string;
  urlImg: UrlImage;
  precio: number;
  rebanadas: number;
  tamano: number;
  nombre: string;
}

export interface PizzaIngredient {
  _id: string;
  urlImg: UrlImage;
  precio: number;
  nombre: string;
}

/**
 * Promo
 */
export interface Promo {
  _id: string;
  valid_days: DiaStatus[];
  pizzas: Pizza[];
  bebidas: Drink[];
  complementos: Complement[];
  modificar: boolean;
  nombre: string;
  precio: number;
  tipo: string;
  urlImg: UrlImage;
}

export interface PromoLimits {
  minPizza: number;
  maxPizza: number;
  minBebida: number;
  maxBebida: number;
  minComplemento: number;
  maxComplemento: number;
}

export interface DiaStatus {
  status: boolean;
  dia:
    | "Lunes"
    | "Martes"
    | "Miércoles"
    | "Jueves"
    | "Viernes"
    | "Sábado"
    | "Domingo";
}
