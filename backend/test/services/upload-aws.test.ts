import app from '../../src/app';

describe('\'upload-aws\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-aws');
    expect(service).toBeTruthy();
  });
});
