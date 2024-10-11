import { uploadFile, signUrl, deleteFile } from '../services/s3Service.js';

export const uploadProfilePicture = async (keyName, imageFile) => {
  return await uploadFile(process.env.BUCKET_NAME, imageFile, keyName);
};

export const deleteProfilePicture = async (key) => {
  return await deleteFile(process.env.BUCKET_NAME, key);
};

export const signProfilePictureFile = async (key) => {
  return await signUrl(process.env.BUCKET_NAME, key);
};
