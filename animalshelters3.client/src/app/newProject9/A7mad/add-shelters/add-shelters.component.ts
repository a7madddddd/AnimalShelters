import { Component, OnInit } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-add-shelters',
  templateUrl: './add-shelters.component.html',
  styleUrls: ['./add-shelters.component.css']
})

  export class AddSheltersComponent {
  animal = {
    name: '',
    address: '',
    phone: '',
    email: '',
    createdAt: '',
    verified: false
  };

  constructor(private _ser: A7madService) { }

  addShelters(data: any) {
    console.log('Submitted Data:', data);  // Debug the form data

    data.verified = (data.verified === 'true');  // Ensure 'verified' is boolean

    const requestPayload = {
      shelterDto: data
    };

    this._ser.addShelters(requestPayload).subscribe(
      (response) => {
        alert("Shelter Added Successfully");
      },
      (error) => {
        console.error("Validation Error: ", error.error);
      }
    );
  }

}

