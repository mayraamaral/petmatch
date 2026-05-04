import * as Location from "expo-location";

export type DeviceLocationErrorCode =
  | "PERMISSION_DENIED"
  | "LOCATION_UNAVAILABLE"
  | "UNKNOWN";

export class DeviceLocationError extends Error {
  constructor(public readonly code: DeviceLocationErrorCode, message: string) {
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

type AddressParts = Pick<
  ResolvedDeviceLocation,
  "city" | "state" | "country"
>;

const COORD_DECIMALS = 6;
const POSITION_OPTIONS = {
  accuracy: Location.Accuracy.Balanced,
} as const;

const EMPTY_ADDRESS: AddressParts = {
  city: "",
  state: "",
  country: "",
};

function coordsFrom(position: Location.LocationObject): {
  latitude: number;
  longitude: number;
} {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

function addressFromGeocode(
  row: Location.LocationGeocodedAddress
): AddressParts {
  return {
    city: row.city ?? row.district ?? row.subregion ?? "",
    state: row.region ?? row.subregion ?? "",
    country: row.country ?? "",
  };
}

export class DeviceLocationService {
  async resolveCurrentLocation(): Promise<ResolvedDeviceLocation> {
    await this.assertForegroundAllowed();
    const coords = await this.fetchCoordinates();
    const address = await this.tryResolveAddress(coords);
    return this.toResolved(coords, address);
  }

  private async assertForegroundAllowed(): Promise<void> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") return;

    throw new DeviceLocationError(
      "PERMISSION_DENIED",
      "Permissão de localização negada."
    );
  }

  private async fetchCoordinates(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    try {
      const position = await Location.getCurrentPositionAsync(POSITION_OPTIONS);
      return coordsFrom(position);
    } catch {
      throw new DeviceLocationError(
        "LOCATION_UNAVAILABLE",
        "Não foi possível obter localização atual."
      );
    }
  }

  private async tryResolveAddress(coords: {
    latitude: number;
    longitude: number;
  }): Promise<AddressParts> {
    try {
      const rows = await Location.reverseGeocodeAsync(coords);
      const first = rows[0];
      return first ? addressFromGeocode(first) : EMPTY_ADDRESS;
    } catch {
      return EMPTY_ADDRESS;
    }
  }

  private toResolved(
    coords: { latitude: number; longitude: number },
    address: AddressParts
  ): ResolvedDeviceLocation {
    const { city, state, country } = address;

    return {
      latitude: coords.latitude.toFixed(COORD_DECIMALS),
      longitude: coords.longitude.toFixed(COORD_DECIMALS),
      city,
      state,
      country,
      hasCompleteAddress: !!(city && state && country),
    };
  }
}
