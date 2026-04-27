import * as Location from "expo-location";

export type DeviceLocationErrorCode =
  | "PERMISSION_DENIED"
  | "LOCATION_UNAVAILABLE"
  | "UNKNOWN";

export class DeviceLocationError extends Error {
  constructor(
    public readonly code: DeviceLocationErrorCode,
    message: string
  ) {
    super(message);
  }
}

export type ResolvedDeviceLocation = {
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  country: string;
  hasCompleteAddress: boolean;
};

export class DeviceLocationService {
  async resolveCurrentLocation(): Promise<ResolvedDeviceLocation> {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new DeviceLocationError(
        "PERMISSION_DENIED",
        "Permissão de localização negada."
      );
    }

    let currentPosition: Location.LocationObject;
    try {
      currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    } catch {
      throw new DeviceLocationError(
        "LOCATION_UNAVAILABLE",
        "Não foi possível obter localização atual."
      );
    }

    const latitude = currentPosition.coords.latitude.toFixed(6);
    const longitude = currentPosition.coords.longitude.toFixed(6);

    let city = "";
    let state = "";
    let country = "";

    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });

      const firstAddress = addresses[0];
      if (firstAddress) {
        city =
          firstAddress.city ?? firstAddress.district ?? firstAddress.subregion ?? "";
        state = firstAddress.region ?? firstAddress.subregion ?? "";
        country = firstAddress.country ?? "";
      }
    } catch {
      throw new DeviceLocationError(
        "UNKNOWN",
        "Não foi possível resolver o endereço da localização."
      );
    }

    return {
      latitude,
      longitude,
      city,
      state,
      country,
      hasCompleteAddress: !!city && !!state && !!country,
    };
  }
}
