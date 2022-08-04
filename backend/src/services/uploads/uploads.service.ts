import { Application } from '@/declarations';
import { NextFunction, Response } from 'express';

import blobService from 'feathers-blob';

import multer from 'multer';
import hooks from './uploads.hooks';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-blob-store');
const multipartMiddleware = multer();
const blobStorage = fs('./uploads');

export default function (app: Application) {
  app.use(
    'uploads',
    multipartMiddleware.single('uri'),
    (req: any, _: Response, next: NextFunction) => {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage }),
    (_: any, res: any, next: NextFunction) => {
      const result = res.data;
      const hook = res.hook;
      const condition =
        hook.type === 'after' && hook.method === 'get' && result.file;
      if (condition) {
        if (result.filename) {
          res.setHeader(
            'Content-disposition',
            `attachment; filename=${result.filename}`
          );
        }
        res.type(result.file.MIME);
        res.end(result.file.buffer);
      } else {
        next();
      }
    }
  );
  const service = app.service('uploads') as any;
  service.hooks(hooks);
}
