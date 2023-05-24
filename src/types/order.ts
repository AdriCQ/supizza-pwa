import type { CartOffer } from "./data";

export type Pago = "Tarjeta" | "Efectivo";
export type TipoEntrega = "Entregar en la puerta" | "Encontrarse afuera";

export interface Direccion {
  lat: number;
  lng: number;
  direccion: string;
}

export interface OrderCreate {
  addressId: string;
  clientId: string;
  paymentType: "Tarjeta" | "Efectivo";
  orderOffers: CartOffer[];
  deliveryType: "Entregar en la puerta" | "Encontrarse afuera";
  totalPrice: number;
}
