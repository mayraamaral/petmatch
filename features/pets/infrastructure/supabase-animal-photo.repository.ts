import { File } from "expo-file-system";

import { supabase } from "@/lib/supabase";
import type { AnimalPhotoRepository } from "../domain/repositories/animal-photo.repository";

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const ANIMAL_PHOTOS_BUCKET = process.env.EXPO_PUBLIC_SUPABASE_ANIMALS_BUCKET;

const getAnimalPhotosBucket = () => {
  if (!ANIMAL_PHOTOS_BUCKET) {
    throw new Error("Bucket de fotos dos pets não configurado.");
  }

  return ANIMAL_PHOTOS_BUCKET;
};

const getFileExtension = (uri: string) => {
  const lastSegment = uri.split("/").pop() ?? "";
  const cleanSegment = lastSegment.split("?")[0]?.split("#")[0] ?? "";
  const extension = cleanSegment.split(".").pop()?.toLowerCase();
  return extension || "jpg";
};

const getContentTypeFromExtension = (extension: string): string | null => {
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "heic") return "image/heic";
  if (extension === "gif") return "image/gif";
  return null;
};

const getExtensionFromMimeType = (mimeType: string): string | null => {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/heic" || mimeType === "image/heif") return "heic";
  if (mimeType === "image/gif") return "gif";
  return null;
};

const buildStoragePath = (userId: string, extension: string) =>
  `${userId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.${extension}`;

const toArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
};

export class SupabaseAnimalPhotoRepository implements AnimalPhotoRepository {
  async uploadPhoto(
    localUri: string,
    userId: string,
  ): Promise<{ storagePath: string }> {
    const file = new File(localUri);
    if (!file.exists) {
      throw new Error("Não foi possível ler a foto selecionada.");
    }

    const bytes = await file.bytes();
    if (bytes.byteLength === 0) {
      throw new Error("A foto selecionada está vazia. Escolha outra imagem.");
    }
    if (bytes.byteLength > MAX_UPLOAD_BYTES) {
      throw new Error("A foto deve ter no máximo 2 MB.");
    }

    const uriExtension = getFileExtension(localUri);
    const mimeByExtension = getContentTypeFromExtension(uriExtension);
    const detectedMimeType = file.type?.toLowerCase() ?? "";

    const resolvedMimeType = detectedMimeType.startsWith("image/")
      ? detectedMimeType
      : mimeByExtension;

    if (!resolvedMimeType || !resolvedMimeType.startsWith("image/")) {
      throw new Error("Apenas arquivos de imagem são permitidos.");
    }

    const resolvedExtension =
      getExtensionFromMimeType(resolvedMimeType) ?? uriExtension;

    const bucketName = getAnimalPhotosBucket();
    const storagePath = buildStoragePath(userId, resolvedExtension);
    const uploadBody = toArrayBuffer(bytes);

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, uploadBody, {
        contentType: resolvedMimeType,
        upsert: false,
      });

    if (error) throw error;

    return { storagePath };
  }

  async deletePhoto(storagePath: string): Promise<void> {
    const bucketName = getAnimalPhotosBucket();
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([storagePath]);
    if (error) throw error;
  }
}
