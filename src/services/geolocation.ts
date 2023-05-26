import type { Address, AddressCreate, MapGeolocation } from "@/types";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { latLng, LatLng } from "leaflet";
import { api } from "./axios";
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
    return api.get<MapGeolocation>(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          ...params,
        },
      }
    );
  }

  /**
   * getClientAddress
   * @param clientId
   * @returns
   */
  async function getClientAddress(clientId: string) {
    return api.get<Address[]>(`/api/direcciones/${clientId}/cliente`);
  }

  /**
   * createClientAddress
   * @param param
   * @returns
   */
  async function createClientAddress(param: AddressCreate) {
    return api.post<Address>("/api/direcciones", param);
  }

  /**
   * removeClientAddress
   * @param addressId
   * @returns
   */
  async function removeClientAddress(addressId: string) {
    return api.delete(`/api/direcciones/${addressId}`);
  }

  return {
    addressFromCoordinates,
    currentPosition,
    // Address
    createClientAddress,
    getClientAddress,
    removeClientAddress,
  };
}
