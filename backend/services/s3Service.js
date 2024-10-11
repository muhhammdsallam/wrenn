import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';

const client = new S3Client({
  credentials: fromEnv(),
  region: 'us-east-1',
});

export const uploadFile = async (bucketName, file, key) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
  });

  const response = await client.send(command);
  return response;
};

export const deleteFile = async (bucketName, key) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const response = await client.send(command);
  return response;
};

export const signUrl = async (bucketName, key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return url;
};
