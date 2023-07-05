export interface Notification {
  content: string;
  type: "info" | "positive" | "negative";
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

export * from "./dataTypes";
export * from "./geo";
// export * from "./order";
export * from "./user";
