import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheltersComponent } from './add-shelters.component';

describe('AddSheltersComponent', () => {
  let component: AddSheltersComponent;
  let fixture: ComponentFixture<AddSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
