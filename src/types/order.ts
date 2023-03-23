import { ICartOffer } from "./data";

export type IPago = "Tarjeta" | "Efectivo";
export type ITipoEntrega = "Entregar en la puerta" | "Encontrarse afuera";

export interface IDireccion {
  lat: number;
  lng: number;
  direccion: string;
}

export interface IOrderCreate {
  Nombre: string;
  Telefono: string;
  Productos: ICartOffer[];
  TipoEntrega: ITipoEntrega;
  Direccion: IDireccion;
}
