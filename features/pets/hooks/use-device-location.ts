import { useCallback, useState } from "react";

import {
  DeviceLocationError,
  DeviceLocationService,
  type ResolvedDeviceLocation,
} from "../infrastructure/device-location.service";

const deviceLocationService = new DeviceLocationService();

export function useDeviceLocation() {
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);

  const resolveCurrentLocation = useCallback(async (): Promise<ResolvedDeviceLocation> => {
    try {
      setIsResolvingLocation(true);
      return await deviceLocationService.resolveCurrentLocation();
    } catch (error) {
      if (error instanceof DeviceLocationError) {
        throw error;
      }
      throw new DeviceLocationError(
        "UNKNOWN",
        "Não foi possível obter localização do dispositivo."
      );
    } finally {
      setIsResolvingLocation(false);
    }
  }, []);

  return {
    isResolvingLocation,
    resolveCurrentLocation,
  };
}
