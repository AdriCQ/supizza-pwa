import { CartOffer } from "./data";

export type Pago = "Tarjeta" | "Efectivo";
export type TipoEntrega = "Entregar en la puerta" | "Encontrarse afuera";

export interface Direccion {
  lat: number;
  lng: number;
  direccion: string;
}

export interface OrderCreate {
  Nombre: string;
  Telefono: string;
  Productos: CartOffer[];
  TipoEntrega: "Entregar en la puerta" | "Encontrarse afuera";
  Pago: "Tarjeta" | "Efectivo";
  Direccion: Direccion;
}
