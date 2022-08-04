import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { ServiceAddons } from '@feathersjs/feathers';
import { CustomAuthenticationService } from './services/authentication/authentication.class';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

export default function(app: Application): void {
  const authentication = new CustomAuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());

  app.use('/auth', authentication);
  app.get('/auth/request-nonce/:address', authentication.requestNonce);
  app.post('/auth/verify-signature', authentication.verifySignature);
}
