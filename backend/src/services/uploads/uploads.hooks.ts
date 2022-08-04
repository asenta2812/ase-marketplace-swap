import { HooksObject } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dauria = require('dauria');
const hooks: HooksObject = {
  before: {
    all: [],
    get: [],
    create: [
      (context: any) => {
        if (!context.data.uri && context.params.file) {
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { uri };
        }
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    get: [
      (context: any) => {
        if (context.result.uri) {
          context.result.filename = context.params.query.filename;
          context.result.file = dauria.parseDataURI(context.result.uri);
          delete context.result.uri;
        }
      },
    ],
    create: [
      (context: any) => {
        if (context.result.uri) {
          delete context.result.uri;
        }
      },
    ],
    remove: [],
  },

  error: {
    all: [],
    get: [],
    create: [],
    remove: [],
  },
};

export default hooks;
