import { TestBed } from '@angular/core/testing';

import { LujainService } from './lujain.service';

describe('LujainService', () => {
  let service: LujainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LujainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
