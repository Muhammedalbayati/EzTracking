import { FwModule } from './fw.module';

describe('FwModule', () => {
  let fwModule: FwModule;

  beforeEach(() => {
    fwModule = new FwModule();
  });

  it('should create an instance', () => {
    expect(fwModule).toBeTruthy();
  });
});
