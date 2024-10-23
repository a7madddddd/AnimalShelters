import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionComponent } from './adoption.component';

describe('AdoptionComponent', () => {
  let component: AdoptionComponent;
  let fixture: ComponentFixture<AdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
