import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRejectPostComponent } from './all-reject-post.component';

describe('AllRejectPostComponent', () => {
  let component: AllRejectPostComponent;
  let fixture: ComponentFixture<AllRejectPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRejectPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRejectPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
