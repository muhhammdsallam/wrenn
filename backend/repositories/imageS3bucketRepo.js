import s3Service from '../services/s3Service.js';

const bucketName = 'wrenn-app';

const uploadProfilePicture = async (userId, imageFile) => {
  const keyName = userId;
  return await s3Service.uploadFile(bucketName, imageFile, keyName);
};

const signProfilePictureFile = async (key) => {
  return await s3Service.signUrl(bucketName, key);
};

export default {
  uploadProfilePicture,
  signProfilePictureFile,
};
