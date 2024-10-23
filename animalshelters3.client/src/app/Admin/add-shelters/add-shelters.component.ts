import { Component } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    createdAt: new Date().toISOString(),
    verified: false
  };

  constructor(private _ser: A7madService, private router: Router) { }

  addShelters(data: any) {
    console.log('Submitted Data:', data);

    data.verified = (data.verified === 'true');

    this._ser.addShelters(data).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Shelter Added Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to another page after SweetAlert confirmation
          this.router.navigate(['/your-target-route']); // Replace with your actual route
        });
      },
      (error) => {
        console.error("Error occurred: ", error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error adding the shelter.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }
}
