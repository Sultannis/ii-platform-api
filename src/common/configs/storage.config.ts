import dotenv from 'dotenv';

dotenv.config();

export const storageConfig = {
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsS3BucketUrl: process.env.AWS_S3_BUCKET_URL,
};
