import { TestBed } from '@angular/core/testing';

import { NoorService } from './noor.service';

describe('NoorService', () => {
  let service: NoorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
