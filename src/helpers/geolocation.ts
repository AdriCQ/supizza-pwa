import type { IMapGeolocation } from "@/types";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { latLng, LatLng } from "leaflet";
import { api } from "./service";
/**
 * useMap
 * @returns
 */
export function useMap() {
  /**
   * Geolocation_currentPosition
   * @returns
   */
  async function currentPosition(): Promise<LatLng> {
    // request permission
    if (Capacitor.getPlatform() !== "web")
      await Geolocation.requestPermissions();
    const { coords } = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 8000,
      timeout: 8000,
    });

    return latLng(coords.latitude, coords.longitude);
  }
  /**
   * addressFromCoordinates
   * @param params
   * @returns
   */
  async function addressFromCoordinates(params: { lat: number; lon: number }) {
    return api.get<IMapGeolocation>(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          ...params,
        },
      }
    );
  }

  return {
    addressFromCoordinates,
    currentPosition,
  };
}
