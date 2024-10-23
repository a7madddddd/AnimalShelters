import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAprovedPostComponent } from './all-aproved-post.component';

describe('AllAprovedPostComponent', () => {
  let component: AllAprovedPostComponent;
  let fixture: ComponentFixture<AllAprovedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAprovedPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAprovedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
