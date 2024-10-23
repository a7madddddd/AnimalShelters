import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSheltersComponent } from './edit-shelters.component';

describe('EditSheltersComponent', () => {
  let component: EditSheltersComponent;
  let fixture: ComponentFixture<EditSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
