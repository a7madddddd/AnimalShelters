import { Component, OnInit } from '@angular/core';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import { BehaviorSubjectService } from '../BehaviorSubject/behavior-subject.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = { image: '' };
  adoptionData: any[] = [];

  constructor(private _ser: LujainServiceService, private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    const userId = this.behaviorSubjectService.getUserId();
    if (userId) {
      this.ShowUserDetails(Number(userId));
      this.getAdoption(Number(userId));
    } else {
      console.error("User ID not found.");
    }
  }

  ShowUserDetails(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.user = data;

        if (this.user.image) {
          this.user.image = `https://localhost:7295/${this.user.image}`;
        }
      },
      (error) => {
        console.error("Error fetching user details:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Failed to fetch user details: " + (error.error.message || "An error occurred.")
        });
      }
    );
  }

  handleUserUpdate(updatedUser: any) {
    this.user = { ...this.user, ...updatedUser };
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.'
    });
  }

  getAdoption(userId: number): void {
    this._ser.getAdoptionApp(userId).subscribe(
      (data) => {
        this.adoptionData = data;
        console.log('Adoption Data:', this.adoptionData);
      },
      (error) => {
        console.error('Error fetching adoption data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch adoption data: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }

  downloadPDF(application: any): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Adoption Application Details', 14, 22);
    doc.setFontSize(12);
    doc.text(`Application ID: ${application.applicationId}`, 14, 40);
    doc.text(`Animal Name: ${application.animalName}`, 14, 50);
    doc.text(`Animal Age: ${application.animalAge}`, 14, 60);
    doc.text(`Animal Breed: ${application.animalBread}`, 14, 70);
    doc.text(`Animal Temperament: ${application.animalTemp}`, 14, 80);
    doc.text(`Status: ${application.status}`, 14, 90);
    doc.text(`Message: ${application.message}`, 14, 100);
    doc.text(`Submitted At: ${new Date(application.submittedAt).toLocaleString()}`, 14, 110);

    doc.save(`adoption_application_${application.applicationId}.pdf`);

    // SweetAlert for successful PDF download
    Swal.fire({
      icon: 'success',
      title: 'Download Successful',
      text: 'Your adoption application details have been downloaded.'
    });
  }


  withdrawApplication(applicationId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, withdraw it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.withdrawApplication(applicationId).subscribe(
          () => {
            Swal.fire(
              'Withdrawn!',
              'Your application has been withdrawn.',
              'success'
            );
            // Optionally refresh the adoption data or navigate
            this.getAdoption(Number(this.behaviorSubjectService.getUserId()));
          },
          (error) => {
            console.error('Error withdrawing application:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to withdraw application: ' + (error.error.message || 'An error occurred.')
            });
          }
        );
      }
    });
  }
}
