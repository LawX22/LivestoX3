// config/storage.config.ts
// Storage configuration - change this if you want to use a different bucket name

export const STORAGE_CONFIG = {
  // Change this bucket name if needed
  BUCKET_NAME: 'avatars',  // ← Change to 'images', 'user-uploads', etc.
  
  // Maximum file size (in bytes)
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Allowed file types
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  
  // Folder structure
  FOLDERS: {
    PROFILE_PICTURES: 'profile-pictures',
    BANNERS: 'banners'
  }
}

// Helper to get allowed types as string
export const getAllowedTypesString = (): string => {
  return STORAGE_CONFIG.ALLOWED_TYPES.map(type => type.split('/')[1].toUpperCase()).join(', ')
}

// Helper to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}