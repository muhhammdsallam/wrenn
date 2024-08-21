import S3 from '../instances/AWS/s3.js';

const s3Service = {
  uploadFile: async (bucketName, file, key) => {
    return S3.upload({
      Bucket: bucketName,
      Key: key,
      Body: file,
    }).promise();
  },

  signUrl: async (bucketName, key) => {
    return S3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 60 * 5,
    });
  },
};

export default s3Service;
