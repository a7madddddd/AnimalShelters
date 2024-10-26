import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A7madService } from '../../../../Services/a7mad.service';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-edit-adoption',
  templateUrl: './edit-adoption.component.html',
  styleUrls: ['./edit-adoption.component.css']
})
export class EditAdoptionComponent implements OnInit {
  adoption: any = {
    applicationId: 0,
    userId: '',
    animalId: '',
    status: '',
    message: '',
    submittedAt: new Date(),
    adminNotes: '' // Add this line
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
    console.log('Loading adoption with ID:', id);
    this.a7madService.getAdoptionById(id).subscribe({
      next: async (data) => {  // Make this async
        console.log('Received adoption data:', data);
        this.adoption = {
          ...data,
          adminNotes: data.adminNotes || ''
        };
        this.adoption.submittedAt = new Date(this.adoption.submittedAt);
        console.log('Processed adoption data:', this.adoption);

        // Wait for both user and animal data to load
        try {
          await Promise.all([
            this.loadUser(this.adoption.userId),
            this.loadAnimal(this.adoption.animalId)
          ]);
          console.log('All data loaded successfully');
        } catch (error) {
          console.error('Error loading related data:', error);
        }
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

  loadUser(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.a7madService.getUserById(userId).subscribe({
        next: (userData) => {
          this.user = userData;
          console.log('User loaded:', this.user);
          resolve();
        },
        error: (error) => {
          console.error('Error loading user:', error);
          reject(error);
        }
      });
    });
  }

  loadAnimal(animalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.a7madService.getAnimalById(animalId).subscribe({
        next: (animalData) => {
          this.animal = animalData;
          console.log('Animal loaded:', this.animal);
          resolve();
        },
        error: (error) => {
          console.error('Error loading animal:', error);
          reject(error);
        }
      });
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
        // Create a clean template parameters object first
        const templateParams = {
          to_name: this.user.name || 'Valued Customer',
          to_email: this.user.email,
          animal_name: this.animal.name,
          status: this.adoption.status,
          message: this.adoption.message || '',
          admin_notes: this.adoption.adminNotes || ''
        };

        console.log('Email Template Params:', templateParams); // Debug log

        // First update the adoption
        this.a7madService.updateAdoption(this.adoption.applicationId, this.adoption).subscribe({
          next: () => {
            // Choose template based on status
            const emailTemplate = {
              serviceID: 'service_swvlyju',
              templateID: this.adoption.status.toLowerCase() === 'approved'
                ? 'template_gl8mrxl'
                : 'template_81usga9',
              publicKey: 'H5dQ69BemMz8fOlwD',
              templateParams: templateParams
            };

            console.log('Sending email with config:', emailTemplate); // Debug log

            // Send email using emailjs
            emailjs.send(
              emailTemplate.serviceID,
              emailTemplate.templateID,
              emailTemplate.templateParams,
              emailTemplate.publicKey
            )
              .then((response) => {
                console.log('Email sent successfully:', response);
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Adoption updated and email sent successfully',
                  timer: 1500,
                  showConfirmButton: false
                });
                this.router.navigate(['/adminDashboard/All Adoption']);
              })
              .catch((error) => {
                console.error('EmailJS Error:', error);
                Swal.fire({
                  icon: 'warning',
                  title: 'Email Not Sent',
                  text: 'Adoption was updated but email notification failed',
                });
                this.router.navigate(['/adminDashboard/All Adoption']);
              });
          },
          error: (error) => {
            console.error('Update Error:', error);
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
