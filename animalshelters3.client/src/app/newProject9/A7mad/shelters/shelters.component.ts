import { Component, OnInit } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';
import { Animal } from '../../../../shared/interfaces';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']  
})
export class SheltersComponent implements OnInit {  

  dataArray: any[] = [];
  animals: Animal[] = []; // Array to hold animals
  selectedShelterId: number | null = null; // Track the selected shelter

  constructor(private _ser: A7madService) { }

  ngOnInit() {
    this.getShelters();
  }

  getShelters() {
    this._ser.getAllShelters().subscribe(
      (data) => {
        console.log('Shelters fetched:', data);
        this.dataArray = data; 
      },
      (error) => {
        console.error('Error fetching shelters:', error); 
      }
    );
  }

  showAnimals(shelterId: number) {
    this.selectedShelterId = shelterId; // Set the selected shelter ID
    this._ser.getAnimalsByShelter(shelterId).subscribe(
      (data) => {
        this.animals = data; // Store the fetched animals
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

}
