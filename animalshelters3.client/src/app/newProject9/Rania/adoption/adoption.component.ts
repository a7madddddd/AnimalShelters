import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal-service.service';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../../../../shared/interfaces';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  animal: Animal | undefined;

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const animalId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from the route parameters
    this.getAnimalDetails(animalId);
  }

  getAnimalDetails(id: number) {
    this.animalService.getAnimalById(id).subscribe(
      (data) => {
        this.animal = data;
      },
      (error) => {
        console.error('Error fetching animal details:', error);
      }
    );
  }
}
