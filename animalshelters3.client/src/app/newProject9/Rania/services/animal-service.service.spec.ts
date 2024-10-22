import { TestBed } from '@angular/core/testing';

import { AnimalService } from '../services/animal-service.service';

describe('AnimalServiceService', () => {
  let service: AnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
