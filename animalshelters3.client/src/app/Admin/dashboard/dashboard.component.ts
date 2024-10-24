import { Component } from '@angular/core';
import { BehaviorSubjectService } from '../../newProject9/Lujain/BehaviorSubject/behavior-subject.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  private openedDropdowns: Set<string> = new Set();
  isLoggedIn: boolean = false;

  constructor(private behaviorSubjectService: BehaviorSubjectService, private _router: Router) { }

  toggleDropdown(menuId: string) {
    if (this.openedDropdowns.has(menuId)) {
      this.openedDropdowns.delete(menuId);
    } else {
      this.openedDropdowns.clear(); // أغلق جميع القوائم المنسدلة الأخرى
      this.openedDropdowns.add(menuId);
    }
  }

  isDropdownOpen(menuId: string): boolean {
    return this.openedDropdowns.has(menuId);
  }
  ngOnInit() {
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.isLoggedIn = !!userId;
      if (!this.isLoggedIn) {
        this._router.navigate(['/admin']);
      }
    });
  }

  logout() {
    this.behaviorSubjectService.setUserId('');
    Swal.fire({ // SweetAlert for logout confirmation
      icon: 'success',
      title: 'Logged Out',
      text: 'Logged out successfully.',
      confirmButtonText: 'OK'
    });
    this._router.navigate(['/admin']);
  }
}
