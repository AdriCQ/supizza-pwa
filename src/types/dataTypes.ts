import { User } from "./user";
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
  limites: PromoLimits;
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

export interface Pedido {
  _id: string;
  bebidas: PedidoBebida[];
  complementos: PedidoComplemento[];
  pizzas: PedidoPizza[];
  promos: PedidoPromo[];
  monto_pagado: number;
  pagado: boolean;
  total: number;
  forma_pago: "Efectivo" | "Tarjeta";
  cliente: User;
  fecha: string;
  sucursal: string;
  entrega: string;
  status: "COMPLETADO" | "Pendiente";
  tipo: "Panel";
  direccion: string;
  nota: string;
  repartidor?: null;
  cajero: string;
}

export interface PedidoCreate
  extends Omit<
    Pedido,
    "_id" | "repartidor" | "cajero" | "monto_pagado" | "fecha" | "cliente"
  > {
  cliente: string;
}

export interface PedidoComplemento extends Complement {
  cantidad: number;
  tipo: "complemento";
  precioOferta: number;
}

export interface PedidoBebida extends Drink {
  cantidad: number;
  tipo: "bebida";
  precioOferta: number;
}

export interface PedidoPizza extends Pizza {
  cantidad: number;
  tipo: "pizza";
  precioOferta: number;
}

export interface PedidoPromo extends Promo {
  cantidad: number;
  tipo: "promo";
  precioOferta: number;
}
