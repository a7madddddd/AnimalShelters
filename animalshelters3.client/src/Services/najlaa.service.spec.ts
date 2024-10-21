import { TestBed } from '@angular/core/testing';

import { NajlaaService } from './najlaa.service';

describe('NajlaaService', () => {
  let service: NajlaaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NajlaaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
