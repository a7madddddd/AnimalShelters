import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '../Lujain/BehaviorSubject/behavior-subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;  

  constructor(private behaviorSubjectService: BehaviorSubjectService, private _router: Router) { }

  ngOnInit() {
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.isLoggedIn = !!userId; 
    });
  }
  logout() {
    this.behaviorSubjectService.setUserId(''); 
    alert("Logged out successfully.");
    this._router.navigate(['']);
  }
  isAdminLogin(): boolean {
    return this._router.url.includes('/admin');
  }

}
