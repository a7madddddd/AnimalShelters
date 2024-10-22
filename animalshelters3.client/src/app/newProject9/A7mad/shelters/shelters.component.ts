import { Component, OnInit } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']  // Corrected from styleUrl to styleUrls
})
export class SheltersComponent implements OnInit {  // Implementing OnInit

  dataArray: any;  // Changed to array for multiple shelters

  constructor(private _ser: A7madService) { }

  ngOnInit() {
    this.getShelters();
  }

  getShelters() {
    this._ser.getAllShelters().subscribe(
      (data) => {
        console.log('Shelters fetched:', data);
        this.dataArray = data; // Make sure this is an array
      },
      (error) => {
        console.error('Error fetching shelters:', error); // Log any errors
      }
    );
  }

}
