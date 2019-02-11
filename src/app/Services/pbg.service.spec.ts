import { TestBed, inject } from '@angular/core/testing';

import { PbgService } from './pbg.service';

describe('PbgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PbgService]
    });
  });

  it('should be created', inject([PbgService], (service: PbgService) => {
    expect(service).toBeTruthy();
  }));
});
