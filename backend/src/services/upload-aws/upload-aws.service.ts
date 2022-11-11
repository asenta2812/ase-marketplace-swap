// Initializes the `upload-aws` service on path `/upload-aws`
import { ServiceAddons } from '@feathersjs/feathers';
import { NextFunction, Response, Request } from 'express';
import { Application } from '@/declarations';
import { getUpload } from '../../aws';
// Don't remove this comment. It's needed to format import lines nicely.
import { authenticate } from '@feathersjs/express';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'upload-aws': ServiceAddons<any>;
  }
}

const handleUploadAws = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files;
  if (files) {
    const imageNames = (files as any[]).map((file: any) =>
      file.key.split('/').pop()
    );
    res.status(201).json({ images: imageNames });
  } else {
    next();
  }
};
export default function (app: Application): void {
  // Initialize our service with any options it requires
  const upload = getUpload(app);

  app.post(
    '/upload-aws',
    authenticate('jwt'),
    upload.array('images', 8),
    handleUploadAws
  );
}
