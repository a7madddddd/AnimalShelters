import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { A7madService } from '../../../Services/a7mad.service';

@Component({
  selector: 'app-all-adoptions',
  templateUrl: './all-adoptions.component.html',
  styleUrl: './all-adoptions.component.css'
})
export class AllAdoptionsComponent implements OnInit {
  adoptions: any[] = [];

  constructor(
    private _ser: A7madService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAdoptions();
  }

  loadAdoptions() {
    this._ser.getAllAdoptions().subscribe({
      next: (data) => {
        this.adoptions = data;
      },
      error: (error) => {
        console.error('Error fetching adoptions:', error);
      }
    });
  }

  viewDetails(applicationId: number) {
    // Navigate to the details page with the adoption ID
    this.router.navigate([`/adminDashboard/Edit Adoption/${applicationId}`]);
  }
}
