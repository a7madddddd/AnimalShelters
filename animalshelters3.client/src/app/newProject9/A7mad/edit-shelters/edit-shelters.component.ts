import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A7madService } from '../../../../Services/a7mad.service';
import { ShelterDTO } from '../../../../shared/interfaces'; 
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-shelters',
  templateUrl: './edit-shelters.component.html',
  styleUrls: ['./edit-shelters.component.css']
})
export class EditSheltersComponent implements OnInit {
  shelterId!: number;
  animal: ShelterDTO = {
    name: '',
    address: '',
    phone: '',
    email: '',
    createdAt: new Date().toISOString(),
    verified: false
  };

  constructor(private route: ActivatedRoute, private _ser: A7madService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shelterId = +params['id'];
      this.getShelterDetails(this.shelterId);
    });
  }

  getShelterDetails(id: number) {
    this._ser.getShelterById(id).subscribe(
      (shelter: ShelterDTO) => {
        this.animal = shelter;

        
        if (this.animal.createdAt) {
          this.animal.createdAt = formatDate(this.animal.createdAt, 'yyyy-MM-ddTHH:mm', 'en-US');
        }
      },
      (error) => {
        console.error("Error fetching shelter details: ", error);
      }
    );
  }

  addShelters(data: ShelterDTO) {
    console.log('Submitted Data:', data);

    
    if (data.verified === undefined || typeof data.verified !== 'boolean') {
      data.verified = false; 
    }

    
    this._ser.updateShelter(this.shelterId, data).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Shelter Updated Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/adminDashboard/All Shelter']);
        });
      },
      (error) => {
        console.error("Error occurred: ", error);
        if (error.error && error.error.errors) {
          console.error("Validation errors: ", error.error.errors);
          Swal.fire({
            title: 'Validation Error!',
            text: JSON.stringify(error.error.errors),
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error updating the shelter.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  deleteShelter() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteShelter(this.shelterId).subscribe(
          () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Shelter has been deleted.',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['/adminDashboard/All Shelter']);
            });
          },
          (error) => {
            console.error("Error occurred: ", error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the shelter.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}
