import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { AnimalService } from '../services/animal-service.service';
import { Animal } from '../../../../shared/interfaces';  // Adjust the relative path

@Component({
  selector: 'app-animal-category',
  templateUrl: './animal-category.component.html',
  styleUrls: ['./animal-category.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation if needed
})
export class AnimalCategoryComponent implements OnInit {
  animals: Animal[] = [];  // All animals data
  filteredAnimals: Animal[] = [];  // Filtered list of animals based on the selected category
  shelterId?: number;  // Optional shelterId if passed in the route

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the shelterId from the route parameters
    const shelterIdParam = this.route.snapshot.paramMap.get('shelterId');

    if (shelterIdParam) {
      this.shelterId = Number(shelterIdParam);

      // Fetch animals based on the shelterId
      this.animalService.getAnimalsByShelterId(this.shelterId).subscribe((data) => {
        this.animals = data;
        this.filteredAnimals = data;  // Initially set filtered animals to all animals
      });
    } else {
      // If no shelterId is provided, fetch all animals
      this.animalService.getAllAnimals().subscribe((data) => {
        this.animals = data;
        this.filteredAnimals = data;  // Initially set filtered animals to all animals
      });
    }
  }

  // Method to filter animals based on the selected category
  onCategorySelected(categoryId: number | null): void {
    if (categoryId) {
      this.animalService.getAnimalsByCategory(categoryId).subscribe((data) => {
        this.filteredAnimals = data;  // Update the filtered animals based on the category
      });
    } else {
      this.animalService.getAllAnimals().subscribe((data) => {
        this.filteredAnimals = data;  // Show all animals if no category is selected
      });
    }
  }
}

