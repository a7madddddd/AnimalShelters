import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryServiceService } from '../services/category-service.service'; // Assuming you have this service

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<number | null>();
  categories: any[] = [];

  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    // Fetch categories from your service
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Method to select a category
  selectCategory(categoryId: number | null): void {
    this.categorySelected.emit(categoryId);  // Emit the selected categoryId
  }
}
