import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '../Lujain/BehaviorSubject/behavior-subject.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;  

  constructor(private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.isLoggedIn = !!userId; 
    });
  }
  logout() {
    this.behaviorSubjectService.setUserId(''); 
    alert("Logged out successfully.");
  }

}
