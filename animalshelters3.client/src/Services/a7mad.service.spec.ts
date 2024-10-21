import { TestBed } from '@angular/core/testing';

import { A7madService } from './a7mad.service';

describe('A7madService', () => {
  let service: A7madService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(A7madService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
