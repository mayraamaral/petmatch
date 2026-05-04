import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export type AnimalPhotoPickerErrorCode = "PERMISSION_DENIED" | "PICKER_ERROR";

export class AnimalPhotoPickerError extends Error {
  constructor(
    public readonly code: AnimalPhotoPickerErrorCode,
    message: string
  ) {
    super(message);
  }
}

type PickResult = {
  uris: string[];
};

export function useAnimalPhotoPicker() {
  const [isPickingPhoto, setIsPickingPhoto] = useState(false);

  const pickPhotoFromLibrary = async (selectionLimit: number = 5): Promise<PickResult> => {
    try {
      setIsPickingPhoto(true);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status !== "granted") {
        throw new AnimalPhotoPickerError(
          "PERMISSION_DENIED",
          "Permissão da galeria negada."
        );
      }

      const result = await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ["images"] as any,
          allowsMultipleSelection: true,
          selectionLimit,
          quality: 0.8,
        } as any
      );

      if (result.canceled || !result.assets?.length) {
        return { uris: [] };
      }

      return { uris: result.assets.map(asset => asset.uri) };
    } catch (error) {
      if (error instanceof AnimalPhotoPickerError) {
        throw error;
      }
      throw new AnimalPhotoPickerError(
        "PICKER_ERROR",
        "Não foi possível abrir a galeria."
      );
    } finally {
      setIsPickingPhoto(false);
    }
  };

  return {
    isPickingPhoto,
    pickPhotoFromLibrary,
  };
}
