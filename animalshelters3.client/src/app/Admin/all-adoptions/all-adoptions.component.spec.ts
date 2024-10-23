import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdoptionsComponent } from './all-adoptions.component';

describe('AllAdoptionsComponent', () => {
  let component: AllAdoptionsComponent;
  let fixture: ComponentFixture<AllAdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAdoptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
