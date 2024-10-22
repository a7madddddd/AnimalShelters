import { Component, OnInit } from '@angular/core';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import { BehaviorSubjectService } from '../BehaviorSubject/behavior-subject.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent implements OnInit {
  user: any; 

  constructor(private _ser: LujainServiceService, private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    const userId = this.behaviorSubjectService.getUserId(); 
    if (userId) {
      this.ShowUserDetails(Number(userId)); 
    } else {
      console.error("User ID not found.");
    }
  }

  ShowUserDetails(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
        if (this.user.image) {
        }
      },
      (error) => {
        console.error("Login Error:", error);
        alert("Login failed: " + (error.error.message || "An error occurred."));
      }
    );
  }
  handleUserUpdate(updatedUser: any) {
    this.user = { ...this.user, ...updatedUser }; // Update user data
  }


}
