import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdoptionComponent } from './edit-adoption.component';

describe('EditAdoptionComponent', () => {
  let component: EditAdoptionComponent;
  let fixture: ComponentFixture<EditAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
