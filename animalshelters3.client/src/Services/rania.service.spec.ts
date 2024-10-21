import { TestBed } from '@angular/core/testing';

import { RaniaService } from './rania.service';

describe('RaniaService', () => {
  let service: RaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
