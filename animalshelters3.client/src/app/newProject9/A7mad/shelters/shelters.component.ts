import { Component } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {

  ngOnInit() {

    this.getShelters();
  }

  constructor(private _ser: A7madService) { }

  dataArray: any;

  getShelters() {

    this._ser.getAllShelters().subscribe((data) => {

      this.dataArray = data
    })
  }
}
