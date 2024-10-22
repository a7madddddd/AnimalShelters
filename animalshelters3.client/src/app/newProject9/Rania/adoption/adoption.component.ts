import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal-service.service';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../../../../shared/interfaces';
import { BehaviorSubjectService } from '../../Lujain/BehaviorSubject/behavior-subject.service';
import { AdoptionApplication } from '../../../../Services/a7mad.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  animal: Animal | undefined;
  userId: string | null = null;
  applicationMessage: string = '';

  constructor(
    private animalService: AnimalService,
    private behaviorSubjectService: BehaviorSubjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const animalId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAnimalDetails(animalId);

    this.behaviorSubjectService.userId$.subscribe(id => {
      this.userId = id;
      console.log('User ID in AdoptionComponent:', this.userId);
    });
  }

  getAnimalDetails(id: number) {
    this.animalService.getAnimalById(id).subscribe(
      (data) => {
        this.animal = data;
        console.log('Animal details:', this.animal); // Log animal details
      },
      (error) => {
        console.error('Error fetching animal details:', error);
      }
    );
  }

  submitAdoption() {
    console.log('Submitting adoption...'); // Log submission attempt
    console.log('User ID:', this.userId); // Log user ID
    console.log('Animal:', this.animal); // Log animal details

    if (!this.userId || !this.animal) {
      alert('User ID or animal details are missing.');
      return;
    }

    const application: AdoptionApplication = {
      userId: Number(this.userId),
      animalId: this.animal.animalId,
      status: 'Pending',
      message: this.applicationMessage,
      submittedAt: new Date(),
      updatedAt: new Date()
    };

    this.animalService.submitAdoptionApplication(application).subscribe(
      response => {
        alert("Application submitted successfully!");
        console.log("Response:", response);
      },
      error => {
        console.error("Error submitting application:", error);
        alert("Application submission failed.");
      }
    );
  }
}
