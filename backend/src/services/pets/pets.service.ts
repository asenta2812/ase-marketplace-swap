// Initializes the `pets` service on path `/pets`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Pets } from './pets.class';
import createModel from '../../models/pets.model';
import hooks from './pets.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    pets: Pets & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$text', '$search', '$regex'],
  };

  // Initialize our service with any options it requires
  app.use('/pets', new Pets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pets');

  service.hooks(hooks);
}
