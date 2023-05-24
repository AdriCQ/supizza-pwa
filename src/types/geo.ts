export interface AddressCreate {
  calle: string;
  cliente: string;
  colonia: string;
  coordenadas: number[];
  nombre: string;
  numero_ext: string;
  numero_int: string;
  referencia: string;
}

export interface Address {
  coordenadas: {
    coordinates: number[];
    type: "Point";
  };
  _id: string;
  saveFrom: string;
  cliente: string;
  referencia: string;
  numero_ext: string;
  calle: string;
  colonia: string;
  nombre: string;
  numero_int: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}
