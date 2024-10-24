import { Component } from '@angular/core';
import { EmailJS } from 'emailjs-com';

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

            EmailJS.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
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
