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
  animals: Animal[] = [];
  shelterId?: number;  // Use the optional '?' in case shelterId is not always available

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the shelterId from the route parameters
    const shelterIdParam = this.route.snapshot.paramMap.get('shelterId');

    if (shelterIdParam) {
      this.shelterId = Number(shelterIdParam);

      // Fetch animals based on the shelterId
      this.animalService.getAnimalsByShelterId(this.shelterId).subscribe((data) => {
        this.animals = data;
      });
    } else {
      // If no shelterId is provided, fetch all animals
      this.animalService.getAllAnimals().subscribe((data) => {
        this.animals = data;
      });
    }
  }
}
