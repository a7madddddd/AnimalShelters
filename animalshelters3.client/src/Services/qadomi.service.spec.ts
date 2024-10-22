import { TestBed } from '@angular/core/testing';

import { QadomiService } from './qadomi.service';

describe('QadomiService', () => {
  let service: QadomiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QadomiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
