import { Component } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-get-all-shelters',
  templateUrl: './get-all-shelters.component.html',
  styleUrl: './get-all-shelters.component.css'
})
export class GetAllSheltersComponent {



  ngOnInit() {
    this.getAllSh();
  }

  constructor(private _ser: A7madService) {

  }
  dataArray: any
  getAllSh() {

    this._ser.getAllSheltersAdmin().subscribe((data) => {
      this.dataArray = data
    })
  }
}
