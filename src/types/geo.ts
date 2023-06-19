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
  _id: string;
  coordenadas: {
    coordinates: number[];
    type: "Point";
  };
  saveFrom: string;
  cliente: string;
  referencia: string;
  numero_ext: string;
  calle: string;
  colonia: string;
  nombre: string;
  numero_int: string;
}

export interface MapGeolocation {
  address: {
    city?: string;
    country?: string;
    country_code?: string;
    county?: string;
    postcode?: string;
    road?: string;
    state?: string;
    street?: string;
  };
  display_name: string;
  lat: string;
  lon: string;
}
