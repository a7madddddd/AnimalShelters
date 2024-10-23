import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSheltersComponent } from './get-all-shelters.component';

describe('GetAllSheltersComponent', () => {
  let component: GetAllSheltersComponent;
  let fixture: ComponentFixture<GetAllSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
