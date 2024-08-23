import { uploadFile, signUrl } from '../services/s3Service.js';

const bucketName = 'wrenn-app';

export const uploadProfilePicture = async (keyName, imageFile) => {
  return await uploadFile(bucketName, imageFile, keyName);
};

export const signProfilePictureFile = async (key) => {
  return await signUrl(bucketName, key);
};
