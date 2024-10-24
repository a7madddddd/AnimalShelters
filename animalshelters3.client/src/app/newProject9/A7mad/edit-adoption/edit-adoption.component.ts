import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A7madService } from '../../../../Services/a7mad.service';

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
    // Add any other fields your adoption model has
  };

  statuses = ['Pending', 'Approved', 'Rejected']; // Adjust based on your status options

  constructor(
    private _ser: A7madService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadAdoption(id);
  }

  loadAdoption(id: number) {
    this._ser.getAdoptionById(id).subscribe({
      next: (data) => {
        this.adoption = data;
        // Convert date string to Date object for the input
        this.adoption.submittedAt = new Date(this.adoption.submittedAt);
      },
      error: (error) => {
        console.error('Error loading adoption:', error);
      }
    });
  }

  updateAdoption() {
    this._ser.updateAdoption(this.adoption.applicationId, this.adoption).subscribe({
      next: () => {
        alert('Adoption updated successfully!');
        this.router.navigate(['/adoptions']);
      },
      error: (error) => {
        console.error('Error updating adoption:', error);
        alert('Error updating adoption');
      }
    });
  }

  deleteAdoption() {
    if (confirm('Are you sure you want to delete this adoption?')) {
      this._ser.deleteAdoption(this.adoption.applicationId).subscribe({
        next: () => {
          alert('Adoption deleted successfully!');
          this.router.navigate(['/adoptions']);
        },
        error: (error) => {
          console.error('Error deleting adoption:', error);
          alert('Error deleting adoption');
        }
      });
    }
  }
}
