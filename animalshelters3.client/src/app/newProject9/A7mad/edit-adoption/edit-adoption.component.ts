import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A7madService } from '../../../../Services/a7mad.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-edit-adoption',
  templateUrl: './edit-adoption.component.html',
  styleUrl: './edit-adoption.component.css'
})
export class EditAdoptionComponent implements OnInit {
  adoption: any = {
    applicationId: 0,
    userId: '',
    animalId: '',
    status: '',
    message: '',
    submittedAt: new Date(),
  };
  user: any = {
    id: '',
    name: '',
    email: '',
  };
  animal: any = {
    id: '',
    name: '',
    breed: '',
  };
  statuses = ['Pending', 'Approved', 'Rejected'];

  constructor(
    private a7madService: A7madService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadAdoption(id);
  }

  loadAdoption(id: number) {
    this.a7madService.getAdoptionById(id).subscribe({
      next: (data) => {
        this.adoption = data;
        this.adoption.submittedAt = new Date(this.adoption.submittedAt);
        this.loadUser(this.adoption.userId);
        this.loadAnimal(this.adoption.animalId);
      },
      error: (error) => {
        console.error('Error loading adoption:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load adoption details',
        });
      }
    });
  }

  loadUser(userId: string) {
    this.a7madService.getUserById(userId).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load user details',
        });
      }
    });
  }

  loadAnimal(animalId: string) {
    this.a7madService.getAnimalById(animalId).subscribe({
      next: (animalData) => {
        this.animal = animalData;
      },
      error: (error) => {
        console.error('Error loading animal:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load animal details',
        });
      }
    });
  }

  updateAdoption() {
    Swal.fire({
      title: 'Update Adoption',
      text: 'Are you sure you want to update this adoption?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.a7madService.updateAdoption(this.adoption.applicationId, this.adoption).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Adoption updated successfully',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/adminDashboard/All Adoption']);
            });
          },
          error: (error) => {
            console.error('Error updating adoption:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update adoption',
            });
          }
        });
      }
    });
  }

  deleteAdoption() {
    Swal.fire({
      title: 'Delete Adoption',
      text: 'Are you sure you want to delete this adoption? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.a7madService.deleteAdoption(this.adoption.applicationId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Adoption has been deleted successfully',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/adminDashboard/All Adoption']);
            });
          },
          error: (error) => {
            console.error('Error deleting adoption:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete adoption',
            });
          }
        });
      }
    });
  }
}
