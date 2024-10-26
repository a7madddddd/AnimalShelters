import { Component } from '@angular/core';
import { LujainServiceService } from '../../newProject9/Lujain/LujainService/lujain-service.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUsersComponent {
  constructor(private _ser: LujainServiceService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  dataUser: any;
  getAllUsers(): void {
    this._ser.getAllUsers().subscribe(
      (data) => {
        this.dataUser = data;
        console.log('User Data:', this.dataUser);
      },
      (error) => {
        console.error('Error fetching adoption data:', error);
        alert('Failed to fetch adoption data: ' + (error.error.message || 'An error occurred.'));
      }
    );
  }
}
