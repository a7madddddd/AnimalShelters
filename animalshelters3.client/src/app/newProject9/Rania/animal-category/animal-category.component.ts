import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal-service.service';
import { Animal } from '../../../../shared/interfaces';  // adjust the relative path

@Component({
  selector: 'app-animal-category',
  templateUrl: './animal-category.component.html',
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
