export interface AddressCreate {
  lat: number;
  lng: number;
  address: string;
  exNum: number;
  inNum: number;
}

export interface Address {
  calle: string;
  cliente: string;
  colonia: string;
  coordenadas: number[];
  nombre: string;
  numero_ext: string;
  numero_int: string;
  referencia: string;
}
