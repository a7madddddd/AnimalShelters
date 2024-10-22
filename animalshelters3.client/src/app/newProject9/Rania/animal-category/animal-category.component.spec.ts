import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCategoryComponent } from './animal-category.component';

describe('AnimalCategoryComponent', () => {
  let component: AnimalCategoryComponent;
  let fixture: ComponentFixture<AnimalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
