export interface INotification {
  content: string;
  type: "info" | "positive" | "negative";
}

export interface IMapGeolocation {
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

export * from "./data";
