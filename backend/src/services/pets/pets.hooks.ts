import { HookContext, HooksObject } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const search = require('feathers-mongodb-fuzzy-search');
import crypto from 'crypto';
import * as feathersAuthentication from '@feathersjs/authentication';
import { STATUS } from '../../utils';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;

// const getPettyByNftId = async (context: HookContext, nftId: number) => {
//   return context.service.find({ query: { nft_id: nftId } });
// };

// const randomNftId = async (context: HookContext): Promise<number> => {
//   let nftId = crypto.randomInt(999999);
//   let nft = await getPettyByNftId(context, nftId);

//   while (nft && nft.total > 0) {
//     nftId = crypto.randomInt(999999);
//     nft = await getPettyByNftId(context, nftId);
//   }

//   return nftId;
// };
const beforeCreate = async (context: HookContext) => {
  const { user } = context.params;

  // const nftId = await randomNftId(context);
  const ownerId = user?._id;
  context.data = {
    ...context.data,
    // nft_id: nftId,
    owner_id: ownerId,
    status: STATUS.CREATED,
  };

  return context;
};
const hooks: HooksObject = {
  before: {
    all: [],
    find: [
      search({
        fields: ['name', 'nft_id'],
        escaped: true,
      }),
    ],
    get: [],
    create: [authenticate('jwt'), beforeCreate],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

export default hooks;
