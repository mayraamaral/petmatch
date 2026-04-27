export interface AnimalPhotoRepository {
  uploadPhoto(localUri: string, userId: string): Promise<{ storagePath: string }>;
  deletePhoto(storagePath: string): Promise<void>;
}
