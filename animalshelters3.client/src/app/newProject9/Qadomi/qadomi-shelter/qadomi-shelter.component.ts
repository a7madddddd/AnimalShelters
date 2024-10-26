import { Component } from '@angular/core';
import { QadomiService } from '../../../../Services/qadomi.service';

@Component({
  selector: 'app-qadomi-shelter',
  templateUrl: './qadomi-shelter.component.html',
  styleUrl: './qadomi-shelter.component.css'
})
export class QadomiShelterComponent {
  ngOnInit() {
    this.getShelters();
  }
  constructor(private _ser: QadomiService) {

  }
  ShelterArray: any
  getShelters() {
    this._ser.GetSheler().subscribe((data) => {
      this.ShelterArray = data
      console.log(this.ShelterArray, "this.ShelterArray")
    })
  }
  //showAnimals(shelterId: number) {
  //  this.selectedShelterId = shelterId; // Set selected shelter ID
  //}

}
