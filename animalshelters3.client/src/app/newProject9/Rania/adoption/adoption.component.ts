import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../../../shared/interfaces';
import { BehaviorSubjectService } from '../../Lujain/BehaviorSubject/behavior-subject.service';
import { AdoptionApplication } from '../../../../Services/a7mad.service';
import Swal from 'sweetalert2';

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
    private route: ActivatedRoute,
    private router: Router // Inject Router
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
        console.log('Animal details:', this.animal);
      },
      (error) => {
        console.error('Error fetching animal details:', error);
      }
    );
  }

  submitAdoption() {
    console.log('Submitting adoption...');
    console.log('User ID:', this.userId);
    console.log('Animal:', this.animal);

    if (!this.userId || !this.animal) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'You have to log in before sending the application.',
      }).then(() => {
        this.router.navigate(['/Login']);
      });
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
        Swal.fire('Success!', 'Application submitted successfully!', 'success');
        this.clearForm(); // Clear the form
        this.router.navigate(['/Shelters']); // Navigate to the desired route
      },
      error => {
        console.error("Error submitting application:", error);
        Swal.fire('Error!', 'Application submission failed.', 'error');
      }
    );
  }

  clearForm() {
    this.applicationMessage = ''; // Clear the message field
    // Reset other fields if necessary
  }
}
