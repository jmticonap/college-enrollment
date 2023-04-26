import { CreateUpdateInterceptor } from './createUpdate.interceptor';

describe('LoggingInterceptor', () => {
  it('should be defined', () => {
    expect(new CreateUpdateInterceptor()).toBeDefined();
  });
});
