import { Component, OnInit, ViewEncapsulation } from '@angular/core';  // Import ViewEncapsulation
import { AnimalService } from '../services/animal-service.service';
import { Animal } from '../../../../shared/interfaces';  // Adjust the relative path

@Component({
  selector: 'app-animal-category',
  templateUrl: './animal-category.component.html',
  styleUrls: ['./animal-category.component.css'],  // Include your styles file
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation
})
export class AnimalCategoryComponent implements OnInit {
  animals: Animal[] = [];  // Define animals array

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.getAllAnimals().subscribe((data) => {
      this.animals = data;
    });
  }
}
