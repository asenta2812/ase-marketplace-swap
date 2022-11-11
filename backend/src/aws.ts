import { Application } from '@/declarations';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

export function initAws(app: Application) {
  const { accessKeyId, secretAccessKey, region } = app.get('awsConfig');
  const s3 = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
  console.log('INIT AWS');
  app.set('s3', s3);
}

export function getUpload(app: Application) {
  const s3 = app.get('s3');
  const { bucket } = app.get('awsConfig');
  return multer({
    storage: multerS3({
      s3,
      bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const name = crypto.randomUUID().split('-')[0];
        const fileName = `images/${name}.${file.originalname.split('.').pop()}`;
        cb(null, fileName);
      },
    }),
  });
}
