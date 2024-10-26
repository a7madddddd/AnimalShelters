import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QadomiShelterComponent } from './qadomi-shelter.component';

describe('QadomiShelterComponent', () => {
  let component: QadomiShelterComponent;
  let fixture: ComponentFixture<QadomiShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QadomiShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QadomiShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
