import { AuthenticationService } from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { Paginated } from '@feathersjs/feathers';
import { isAddress, verifyMessage } from 'ethers/lib/utils';
import { NextFunction, Request, Response } from 'express';
import { Application } from '../../declarations';
import { Users } from '../users/users.class';

export class CustomAuthenticationService extends AuthenticationService {
  constructor(app: Application) {
    super(app);
  }

  requestNonce = async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.params;
    if (!address) {
      const error = new BadRequest('Address is required!');
      return next(error);
    }
    const isValid = isAddress(address);
    if (!isValid) {
      const error = new BadRequest('Address is not valid!');
      return next(error);
    }
    const addressLowerCase = address?.toLowerCase();
    const nonce = Math.floor(Math.random() * 10000 + 1);
    const userService = this.app.service('users') as Users;
    try {
      const users = (await userService.find({
        query: { address: addressLowerCase },
      })) as any;
      if (users?.data?.length === 0) {
        await userService.create({ address: addressLowerCase, nonce });
      } else {
        const user = users.data[0];
        userService.update(user._id, { ...user, nonce });
      }
    } catch (error) {
      return next(error);
    }

    return res.status(200).send({
      nonce,
      address: addressLowerCase,
    });
  };

  verifySignature = async (req: Request, res: Response, next: NextFunction) => {
    const { signature, nonce, address } = req.body;
    if (!signature) {
      return next(new BadRequest('Signature is required!'));
    }
    if (!nonce) {
      return next(new BadRequest('Nonce is required!'));
    }
    if (!address) {
      return next(new BadRequest('Address is required!'));
    }
    const isValid = isAddress(address);
    if (!isValid) {
      const error = new BadRequest('Address is not valid!');
      return next(error);
    }

    const addressLowerCase = address?.toLowerCase();
    const accountVerify = verifyMessage(
      nonce.toString(),
      signature
    ).toLowerCase();
    if (accountVerify === addressLowerCase) {
      const userService = this.app.service('users') as Users;
      const users = (await userService.find({
        query: { address: accountVerify },
      })) as Paginated<any>;
      if (users?.data?.length === 0) {
        return next(new BadRequest('No address found'));
      }

      const user = users.data[0];

      if (user.nonce.toString() === nonce.toString()) {
        const token = await this.createAccessToken({
          nonce,
          name: user.name,
          avatar: user.avatar,
          sub: user._id,
        });

        return res.status(200).send({
          access_token: token,
        });
      }

      return next(new BadRequest('Nonce not match'));
    }

    return next(new BadRequest('Address not match'));
  };
}
