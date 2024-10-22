import { Component, OnInit } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {
  dataArray: any[] = [];
  selectedShelterId: number | undefined = undefined; // Initialize as undefined

  constructor(private _ser: A7madService) { }

  ngOnInit() {
    this.getShelters();
  }

  getShelters() {
    this._ser.getAllShelters().subscribe(
      (data) => {
        this.dataArray = data;
      },
      (error) => {
        console.error('Error fetching shelters:', error);
      }
    );
  }

  showAnimals(shelterId: number) {
    this.selectedShelterId = shelterId; // Set selected shelter ID
  }
}
