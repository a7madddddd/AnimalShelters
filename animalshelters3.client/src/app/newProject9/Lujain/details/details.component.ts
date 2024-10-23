import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import jsPDF from 'jspdf'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  adoptionDataDetails: any;

  constructor(
    private route: ActivatedRoute,
    private _ser: LujainServiceService
  ) { }

  ngOnInit(): void {
    const appId = Number(this.route.snapshot.paramMap.get('id'));
    if (appId) {
      this.getAdoptionDetails(appId);
    }
  }

  getAdoptionDetails(appId: number): void {
    this._ser.getAdoptionAppDetails(appId).subscribe(
      (data) => {
        this.adoptionDataDetails = data;
        console.log('Adoption Data:', this.adoptionDataDetails);
      },
      (error) => {
        console.error('Error fetching adoption details:', error);
        alert('Failed to fetch adoption details: ' + (error.error.message || 'An error occurred.'));
      }
    );
  }



  downloadPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Adoption Application Details', 14, 22);
    doc.setFontSize(12);
    doc.text(`Application ID: ${this.adoptionDataDetails.applicationId}`, 14, 40);
    doc.text(`Animal Name: ${this.adoptionDataDetails.animalName}`, 14, 50);
    doc.text(`Animal Age: ${this.adoptionDataDetails.animalAge}`, 14, 60);
    doc.text(`Animal Breed: ${this.adoptionDataDetails.animalBread}`, 14, 70);
    doc.text(`Animal Temperament: ${this.adoptionDataDetails.animalTemp}`, 14, 80);
    doc.text(`Status: ${this.adoptionDataDetails.status}`, 14, 90);
    doc.text(`Message: ${this.adoptionDataDetails.message}`, 14, 100);
    doc.text(`Submitted At: ${new Date(this.adoptionDataDetails.submittedAt).toLocaleString()}`, 14, 110);

    doc.save(`adoption_application_${this.adoptionDataDetails.applicationId}.pdf`);
  }
}


