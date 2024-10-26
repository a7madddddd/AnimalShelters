import { Component } from '@angular/core';
import emailjs from 'emailjs-com'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { A7madService } from '../../../Services/a7mad.service';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent {
  adoption: any = {};
  user: any = {};
  animal: any = {};

  constructor(private a7madService: A7madService, private router: Router) { }


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
            if (this.adoption.status === 'Approved') {
              // Send email using EmailJS
              const templateParams = {
                to_email: this.user.email,
                status: this.adoption.status,
                animal_name: this.animal.name
              };

              emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(() => {
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
                  console.error('Error sending email:', error);
                  Swal.fire({
                    icon: 'warning',
                    title: 'Email Not Sent',
                    text: 'Adoption updated, but failed to send email notification.',
                  });
                  this.router.navigate(['/adminDashboard/All Adoption']);
                });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Adoption updated successfully',
                timer: 1500,
                showConfirmButton: false
              });
              this.router.navigate(['/adminDashboard/All Adoption']);
            }
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
}
