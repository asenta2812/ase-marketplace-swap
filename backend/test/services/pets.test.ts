import app from '../../src/app';

describe('\'pets\' service', () => {
  it('registered the service', () => {
    const service = app.service('pets');
    expect(service).toBeTruthy();
  });
});
