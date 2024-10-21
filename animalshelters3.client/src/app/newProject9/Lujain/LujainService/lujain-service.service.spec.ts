import { TestBed } from '@angular/core/testing';

import { LujainServiceService } from './lujain-service.service';

describe('LujainServiceService', () => {
  let service: LujainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LujainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
