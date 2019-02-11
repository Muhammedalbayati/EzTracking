import { DispatcherModule } from './dispatcher.module';

describe('DispatcherModule', () => {
  let dispatcherModule: DispatcherModule;

  beforeEach(() => {
    dispatcherModule = new DispatcherModule();
  });

  it('should create an instance', () => {
    expect(dispatcherModule).toBeTruthy();
  });
});
